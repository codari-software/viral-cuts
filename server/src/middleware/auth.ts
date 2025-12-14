import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
    userId?: string;
    file?: Express.Multer.File;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
