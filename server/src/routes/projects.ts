import { Router, Response } from 'express';
import { projectModel } from '../models/Project';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { ffmpegProcessor } from '../services/ffmpegProcessor';
import { cloudinaryService } from '../services/cloudinary';
import { checkShortsLimit, incrementShortsUsage } from '../middleware/checkLimit';
import fs from 'fs';

const router = Router();

// All routes require authentication (JWT only, no DB access needed yet)
router.use(authMiddleware);

// Generate Cloudinary Upload Signature - NO DB REQUIRED
// This must be defined BEFORE any dbCheck middleware
router.get('/upload-signature', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!process.env.CLOUDINARY_API_SECRET) {
            throw new Error('CLOUDINARY_API_SECRET is not defined in environment variables');
        }

        const timestamp = Math.round((new Date).getTime() / 1000);
        const signature = cloudinaryService.generateSignature(timestamp);

        res.json({
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY
        });
    } catch (error: any) {
        console.error('Signature generation error:', error);
        res.status(500).json({
            error: `Signature generation failed: ${error.message || error}`,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Import dbCheck to apply it to subsequent routes
import { dbCheck } from '../middleware/dbCheck';
router.use(dbCheck);

// Get all projects for current user
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const projects = await projectModel.findByUserId(req.userId!);
        res.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single project
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        // Check ownership
        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create project
router.post('/', checkShortsLimit, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, description, duration, numberOfClips } = req.body;

        if (!title) {
            res.status(400).json({ error: 'Title is required' });
            return;
        }

        const project = await projectModel.create({
            userId: req.userId!,
            title,
            description,
            duration,
            numberOfClips: numberOfClips ? parseInt(numberOfClips) : 10, // Default to 10
            status: 'draft',
        });

        // Increment usage for project creation
        await incrementShortsUsage(req.userId!);

        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Upload video to project (Legacy)
router.post('/:id/upload', upload.single('video'), async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            if (req.file) fs.unlinkSync(req.file.path); // Cleanup
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        if (project.userId !== req.userId) {
            if (req.file) fs.unlinkSync(req.file.path); // Cleanup
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        if (!req.file) {
            res.status(400).json({ error: 'No video file uploaded' });
            return;
        }

        // 1. Get Metadata (locally)
        const metadata = await ffmpegProcessor.getMetadata(req.file.path);
        const duration = metadata.format.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // 2. Upload to Cloudinary
        const result = await cloudinaryService.uploadFile(req.file.path, 'viralcuts/raw');

        // 3. Cleanup local temp file
        fs.unlinkSync(req.file.path);

        // 4. Update Project with Cloudinary Data
        const updated = await projectModel.update(req.params.id, {
            videoPath: result.public_id, // Store Public ID in videoPath
            videoUrl: result.secure_url, // Store Full URL in videoUrl
            duration: formattedDuration,
        });

        res.json(updated);
    } catch (error) {
        console.error('Upload error:', error);
        if (req.file) try { fs.unlinkSync(req.file.path); } catch (e) { } // Try to cleanup
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Confirm Client-Side Upload
router.post('/:id/confirm-upload', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        // Check ownership
        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const { videoUrl, videoPath, duration } = req.body;

        if (!videoUrl || !videoPath) {
            res.status(400).json({ error: 'Missing video details' });
            return;
        }

        // Format duration if it comes as seconds (number)
        let formattedDuration = duration;
        if (typeof duration === 'number') {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        const updated = await projectModel.update(req.params.id, {
            videoPath,
            videoUrl,
            duration: formattedDuration,
            status: 'draft' // Reset to draft so they can process it
        });

        res.json(updated);
    } catch (error) {
        console.error('Confirm upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update project
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        // Check ownership
        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const { title, description, status, duration } = req.body;
        const updated = await projectModel.update(req.params.id, {
            title,
            description,
            status,
            duration,
        });

        res.json(updated);
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete project
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        // Check ownership
        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        await projectModel.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
