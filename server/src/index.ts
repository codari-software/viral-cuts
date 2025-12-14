import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import connectDB, { dbError } from './config/db';
import { dbCheck } from './middleware/dbCheck';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import processingRoutes from './routes/processing';

import adminRoutes from './routes/admin';
import { adminAuth } from './middleware/adminAuth';
import webhookRoutes from './routes/webhooks';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health Check - MOVED BEFORE DB CHECK
app.get('/api/health', async (req: Request, res: Response) => {
    let connectionAttemptError = null;
    let dbStatus = mongoose.connection.readyState;

    // Active connection attempt if not connected
    if (dbStatus !== 1) {
        try {
            console.log('Health check: Attempting active DB connection...');
            await connectDB();
            dbStatus = mongoose.connection.readyState; // Update status after connect
        } catch (e) {
            console.error('Health check: DB Connection failed', e);
            connectionAttemptError = e instanceof Error ? e.message : String(e);
        }
    }

    const statusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
        99: 'uninitialized'
    };

    // Check optional dependencies
    const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

    // Check FFmpeg
    let ffmpegStatus = 'unknown';
    try {
        const ffmpegPath = require('ffmpeg-static');
        ffmpegStatus = ffmpegPath ? 'found' : 'missing';
    } catch (e) {
        ffmpegStatus = 'error_loading';
    }

    res.json({
        status: 'ok',
        server: 'ViralCuts Backend',
        timestamp: new Date(),
        dbState: statusMap[dbStatus] || dbStatus,
        connectionAttemptError, // <--- New field with specific error
        lastError: dbError,
        environment: {
            nodeEnv: process.env.NODE_ENV,
            hasMongoUri: !!process.env.MONGO_URI,
            hasCloudinary,
            ffmpegStatus
        }
    });
});

// Ensure DB is connected for every request AFTER health check
app.use(dbCheck);

// Serve static files (processed videos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/outputs', express.static(path.join(__dirname, '../outputs')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/processing', processingRoutes);

app.use('/api/webhooks', webhookRoutes);
app.use('/api/admin', adminAuth, adminRoutes);

// Export app for Vercel
export default app;

// Only listen if run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
        console.log(`📁 Outputs: http://localhost:${PORT}/outputs`);
    });
}
