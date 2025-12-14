import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = Router();

// List all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.find({ email: { $ne: 'admin@codariapp.com.br' } }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, plan } = req.body;

        if (!email || !password || !name) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            plan: plan || 'creator'
        });

        await user.save();

        res.status(201).json({
            id: user._id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
