import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './auth';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_EMAIL = 'admin@codariapp.com.br';

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        req.userId = decoded.userId;

        // Check if user is admin
        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        console.log(`Admin check for: ${user.email} (Expected: ${ADMIN_EMAIL})`);

        if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            console.warn(`⛔ Blocked admin access attempt from: ${user.email}`);
            res.status(403).json({ error: 'Access forbidden: Not an admin' });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
