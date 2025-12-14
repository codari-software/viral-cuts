import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import processingRoutes from './routes/processing';

import adminRoutes from './routes/admin';
import { adminAuth } from './middleware/adminAuth';
import webhookRoutes from './routes/webhooks';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (processed videos)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/outputs', express.static(path.join(__dirname, '../outputs')));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
        99: 'uninitialized'
    };
    res.json({
        status: 'ok',
        server: 'ViralCuts Backend',
        timestamp: new Date(),
        dbState: statusMap[dbStatus] || dbStatus,
        params: {
            hasMongoUri: !!process.env.MONGO_URI,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

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
