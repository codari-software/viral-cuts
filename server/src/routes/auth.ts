import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../middleware/auth';
import { AuthResponse } from '../types';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate token
        const token = generateToken((user._id as unknown as string).toString());

        const response: AuthResponse = {
            token,
            user: {
                id: (user._id as unknown as string).toString(),
                email: user.email,
                name: user.name,
                plan: user.plan,
                shortsUsage: user.shortsUsage,
                cycleStartDate: user.cycleStartDate,
                createdAt: user.createdAt,
            },
        };

        res.json(response);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
router.get('/me', async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({
            id: (user._id as unknown as string).toString(),
            email: user.email,
            name: user.name,
            plan: user.plan,
            shortsUsage: user.shortsUsage,
            cycleStartDate: user.cycleStartDate,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Change password
router.put('/change-password', async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({ error: 'Current and new password are required' });
            return;
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid current password' });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
