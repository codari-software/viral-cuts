import ffmpeg from 'fluent-ffmpeg';
// Imports removed to use dynamic require
// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
// import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { projectModel } from '../models/Project';
import { cloudinaryService } from './cloudinary';

// Set FFmpeg and FFprobe paths
// Set FFmpeg and FFprobe paths safely
try {
    const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
    const ffprobeInstaller = require('@ffprobe-installer/ffprobe');
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    ffmpeg.setFfprobePath(ffprobeInstaller.path);
} catch (e) {
    console.warn('⚠️ FFmpeg binaries not found. Video processing will fail, but API is up.', e);
}

export class FFmpegProcessor {

    /**
     * Download file from URL to temp path
     */
    private async downloadToTemp(url: string, projectId: string): Promise<string> {
        // Ensure temp dir exists (os.tmpdir always exists)

        const tempPath = path.join(os.tmpdir(), `${projectId}-input-${Date.now()}.mp4`);

        // Use Cloudinary URL directly since standard fetch/axios works for public/signed URLs
        // Note: For signed URLs we might need axios, but let's assume secure_url is accessible
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to download video: ${response.statusText}`);

        const fileStream = fs.createWriteStream(tempPath);
        // @ts-ignore - ReadableStream/Node stream mismatch workaround
        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fileStream.write(value);
        }
        fileStream.end();

        return new Promise((resolve) => {
            fileStream.on('finish', () => resolve(tempPath));
        });
    }

    private async cleanup(paths: string[]) {
        paths.forEach(p => {
            try {
                if (fs.existsSync(p)) fs.unlinkSync(p);
            } catch (e) {
                console.error('Cleanup error:', e);
            }
        });
    }

    /**
     * Remove silence from video
     */
    async removeSilence(projectId: string): Promise<string> {
        const project = await projectModel.findById(projectId);
        if (!project || !project.videoUrl) throw new Error('Project or video not found');

        const inputPath = await this.downloadToTemp(project.videoUrl, projectId);
        const outputPath = path.join('temp', `${projectId}-no-silence.mp4`);

        return new Promise((resolve, reject) => {
            projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

            ffmpeg(inputPath)
                .audioFilters('silencedetect=noise=-30dB:d=0.5')
                .on('start', () => {
                    console.log('Starting silence removal for project:', projectId);
                    projectModel.update(projectId, { processingProgress: 10 });
                })
                .on('progress', (progress) => {
                    const percent = Math.min(90, Math.floor((progress.percent || 0)));
                    projectModel.update(projectId, { processingProgress: percent });
                })
                .on('end', async () => {
                    // Upload result to Cloudinary
                    await projectModel.update(projectId, { processingProgress: 95 });
                    cloudinaryService.uploadFile(outputPath, 'viralcuts/processed')
                        .then(async result => {
                            await projectModel.update(projectId, {
                                status: 'completed',
                                processingProgress: 100,
                                videoUrl: result.secure_url,
                                videoPath: result.public_id
                            });
                            this.cleanup([inputPath, outputPath]);
                            resolve(result.secure_url);
                        })
                        .catch(err => {
                            console.error('Cloudinary upload error:', err);
                            reject(err);
                        });
                })
                .on('error', async (err) => {
                    console.error('FFmpeg error:', err);
                    await projectModel.update(projectId, { status: 'failed' });
                    this.cleanup([inputPath, outputPath]);
                    reject(err);
                })
                .audioFilters([
                    'silenceremove=stop_periods=-1:stop_duration=0.5:stop_threshold=-30dB'
                ])
                .outputOptions([
                    '-c:v libx264',
                    '-crf 23',
                    '-preset medium',
                    '-movflags +faststart',
                    '-vf scale=-2:720' // Ensure at least 720p height if possible, or maintain aspect
                ])
                .output(outputPath)
                .run();
        });
    }

    /**
     * Crop video to 9:16 aspect ratio (vertical)
     */
    async cropTo916(projectId: string): Promise<string> {
        const project = await projectModel.findById(projectId);
        if (!project || !project.videoUrl) throw new Error('Project or video not found');

        const inputPath = await this.downloadToTemp(project.videoUrl, projectId);
        const outputPath = path.join('temp', `${projectId}-9-16.mp4`);

        return new Promise((resolve, reject) => {
            projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

            ffmpeg.ffprobe(inputPath, (err, metadata) => {
                if (err) {
                    this.cleanup([inputPath]);
                    reject(err);
                    return;
                }

                const videoStream = metadata.streams.find(s => s.codec_type === 'video');
                if (!videoStream || !videoStream.width || !videoStream.height) {
                    this.cleanup([inputPath]);
                    reject(new Error('Could not determine video dimensions'));
                    return;
                }

                const inputWidth = videoStream.width;
                const inputHeight = videoStream.height;

                const targetRatio = 9 / 16;
                let cropWidth = inputWidth;
                let cropHeight = Math.floor(inputWidth / targetRatio);

                if (cropHeight > inputHeight) {
                    cropHeight = inputHeight;
                    cropWidth = Math.floor(inputHeight * targetRatio);
                }

                const cropX = Math.floor((inputWidth - cropWidth) / 2);
                const cropY = Math.floor((inputHeight - cropHeight) / 2);

                ffmpeg(inputPath)
                    .on('start', () => {
                        console.log('Starting 9:16 crop for project:', projectId);
                        projectModel.update(projectId, { processingProgress: 10 });
                    })
                    .on('progress', (progress) => {
                        const percent = Math.min(90, Math.floor((progress.percent || 0)));
                        projectModel.update(projectId, { processingProgress: percent });
                    })
                    .on('end', async () => {
                        await projectModel.update(projectId, { processingProgress: 95 });
                        cloudinaryService.uploadFile(outputPath, 'viralcuts/processed')
                            .then(async result => {
                                await projectModel.update(projectId, {
                                    status: 'completed',
                                    processingProgress: 100,
                                    videoUrl: result.secure_url,
                                    videoPath: result.public_id
                                });
                                this.cleanup([inputPath, outputPath]);
                                resolve(result.secure_url);
                            })
                            .catch(err => reject(err));
                    })
                    .on('error', async (err) => {
                        console.error('FFmpeg error:', err);
                        await projectModel.update(projectId, { status: 'failed' });
                        this.cleanup([inputPath, outputPath]);
                        reject(err);
                    })
                    .videoFilters(`crop=${cropWidth}:${cropHeight}:${cropX}:${cropY}`)
                    .outputOptions([
                        '-c:v libx264',
                        '-crf 23',
                        '-preset medium',
                        '-movflags +faststart'
                    ])
                    .output(outputPath)
                    .run();
            });
        });
    }

    /**
     * Change Speed (Viral Speed)
     */
    async changeSpeed(projectId: string, speed: number): Promise<string> {
        const project = await projectModel.findById(projectId);
        if (!project || !project.videoUrl) throw new Error('Project or video not found');

        const inputPath = await this.downloadToTemp(project.videoUrl, projectId);
        const outputPath = path.join('temp', `${projectId}-speed-${speed}x.mp4`); // Temp output

        // setpts = 1/speed * PTS (video)
        // atempo = speed (audio)
        const videoFilter = `setpts=${1 / speed}*PTS`;
        const audioFilter = `atempo=${speed}`;

        return new Promise((resolve, reject) => {
            projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

            ffmpeg(inputPath)
                .on('start', () => {
                    console.log(`Starting speed change (${speed}x) for project:`, projectId);
                    projectModel.update(projectId, { processingProgress: 10 });
                })
                .on('progress', (progress) => {
                    const percent = Math.min(90, Math.floor((progress.percent || 0)));
                    projectModel.update(projectId, { processingProgress: percent });
                })
                .on('end', async () => {
                    await projectModel.update(projectId, { processingProgress: 95 });
                    cloudinaryService.uploadFile(outputPath, 'viralcuts/processed')
                        .then(async result => {
                            await projectModel.update(projectId, {
                                status: 'completed',
                                processingProgress: 100,
                                videoUrl: result.secure_url,
                                videoPath: result.public_id
                            });
                            this.cleanup([inputPath, outputPath]);
                            resolve(result.secure_url);
                        })
                        .catch(err => reject(err));
                })
                .on('error', async (err) => {
                    console.error('FFmpeg error:', err);
                    await projectModel.update(projectId, { status: 'failed' });
                    this.cleanup([inputPath, outputPath]);
                    reject(err);
                })
                .videoFilters(videoFilter)
                .audioFilters(audioFilter)
                .outputOptions([
                    '-c:v libx264',
                    '-crf 23',
                    '-preset medium',
                    '-movflags +faststart'
                ])
                .output(outputPath)
                .run();
        });
    }

    /**
     * Get video metadata
     */
    async getMetadata(filePath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) reject(err);
                else resolve(metadata);
            });
        });
    }

    /**
     * Trim video to specific range
     */
    async trimVideo(projectId: string, startTime: number, duration: number): Promise<string> {
        const project = await projectModel.findById(projectId);
        if (!project || !project.videoUrl) throw new Error('Project or video not found');

        const inputPath = await this.downloadToTemp(project.videoUrl, projectId);
        const outputPath = path.join('temp', `${projectId}-trim-${Date.now()}.mp4`);

        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .setStartTime(startTime)
                .setDuration(duration)
                .output(outputPath)
                .on('end', () => {
                    // For trims (previews), we upload to a temp folder or just Raw
                    cloudinaryService.uploadFile(outputPath, 'viralcuts/previews')
                        .then(result => {
                            this.cleanup([inputPath, outputPath]);
                            resolve(result.secure_url);
                        })
                        .catch(err => reject(err));
                })
                .on('error', (err) => {
                    console.error('Trim error:', err);
                    this.cleanup([inputPath, outputPath]);
                    reject(err);
                })
                .run();
        });
    }
}

export const ffmpegProcessor = new FFmpegProcessor();
