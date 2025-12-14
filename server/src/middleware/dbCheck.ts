import { Request, Response, NextFunction } from 'express';
import connectDB from '../config/db';

export const dbCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed within middleware:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
};
