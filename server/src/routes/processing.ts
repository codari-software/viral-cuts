import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { projectModel } from '../models/Project';
import { ffmpegProcessor } from '../services/ffmpegProcessor';


const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Auto-silence removal
router.post('/auto-silence/:projectId', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.projectId);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        if (!project.videoPath) {
            res.status(400).json({ error: 'No video uploaded for this project' });
            return;
        }

        // Start processing in background
        ffmpegProcessor.removeSilence(req.params.projectId).catch(console.error);

        res.json({ message: 'Silence removal started', projectId: req.params.projectId });
    } catch (error) {
        console.error('Auto-silence error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Change Video Speed (Viral Speed)
router.post('/speed/:projectId', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.projectId);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        if (!project.videoPath) {
            res.status(400).json({ error: 'No video uploaded for this project' });
            return;
        }

        const { speed } = req.body;
        const speedValue = speed ? parseFloat(speed) : 1.25;

        // Start processing in background
        ffmpegProcessor.changeSpeed(req.params.projectId, speedValue).catch(console.error);

        res.json({ message: 'Speed change started', projectId: req.params.projectId });
    } catch (error) {
        console.error('Speed change error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Crop to 9:16
router.post('/crop-9-16/:projectId', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.projectId);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        if (!project.videoPath) {
            res.status(400).json({ error: 'No video uploaded for this project' });
            return;
        }

        // Start processing in background
        ffmpegProcessor.cropTo916(req.params.projectId).catch(console.error);

        res.json({ message: 'Crop processing started', projectId: req.params.projectId });
    } catch (error) {
        console.error('Crop error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Trim video
router.post('/trim/:projectId', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const project = await projectModel.findById(req.params.projectId);

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        if (project.userId !== req.userId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        if (!project.videoPath) {
            res.status(400).json({ error: 'No video uploaded for this project' });
            return;
        }

        const { startTime, duration } = req.body;

        if (startTime === undefined || !duration) {
            res.status(400).json({ error: 'startTime and duration are required' });
            return;
        }

        // Generate trim
        const videoUrl = await ffmpegProcessor.trimVideo(
            req.params.projectId,
            Number(startTime),
            Number(duration)
        );

        res.json({ message: 'Trim created', videoUrl });
    } catch (error) {
        console.error('Trim error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
