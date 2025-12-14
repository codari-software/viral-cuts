import { projectModel } from '../models/Project';

export class VideoProcessorService {
    // Simulate auto-silence removal
    async autoSilenceRemoval(projectId: string): Promise<void> {
        const project = projectModel.findById(projectId);
        if (!project) throw new Error('Project not found');

        // Update to processing
        projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

        // Simulate processing with progress updates
        for (let i = 0; i <= 100; i += 20) {
            await this.delay(1000);
            projectModel.update(projectId, { processingProgress: i });
        }

        // Complete
        projectModel.update(projectId, {
            status: 'completed',
            processingProgress: 100,
            videoUrl: `https://example.com/videos/${projectId}_processed.mp4`
        });
    }

    // Simulate caption generation
    async generateCaptions(projectId: string): Promise<void> {
        const project = projectModel.findById(projectId);
        if (!project) throw new Error('Project not found');

        projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

        for (let i = 0; i <= 100; i += 25) {
            await this.delay(800);
            projectModel.update(projectId, { processingProgress: i });
        }

        projectModel.update(projectId, {
            status: 'completed',
            processingProgress: 100,
            videoUrl: `https://example.com/videos/${projectId}_captions.mp4`
        });
    }

    // Simulate 9:16 crop
    async cropTo916(projectId: string): Promise<void> {
        const project = projectModel.findById(projectId);
        if (!project) throw new Error('Project not found');

        projectModel.update(projectId, { status: 'processing', processingProgress: 0 });

        for (let i = 0; i <= 100; i += 10) {
            await this.delay(500);
            projectModel.update(projectId, { processingProgress: i });
        }

        projectModel.update(projectId, {
            status: 'completed',
            processingProgress: 100,
            videoUrl: `https://example.com/videos/${projectId}_9-16.mp4`
        });
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const videoProcessor = new VideoProcessorService();
