import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import User from '../models/User';
import { PLANS, PlanType } from '../config/plans';

export const checkShortsLimit = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const planName = user.plan as PlanType || 'creator';
        const plan = PLANS[planName];

        // Reset usage if new month (simple cycle check)
        const now = new Date();
        const cycleStart = new Date(user.cycleStartDate);
        const diffTime = Math.abs(now.getTime() - cycleStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 30) {
            user.shortsUsage = 0;
            user.cycleStartDate = now;
            await user.save();
        }

        if (user.shortsUsage >= plan.shortsLimit) {
            res.status(403).json({
                error: 'Monthly shorts limit reached',
                currentUsage: user.shortsUsage,
                limit: plan.shortsLimit,
                upgradeRequired: true
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Limit check error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const incrementShortsUsage = async (userId: string): Promise<void> => {
    try {
        console.log(`Incrementing shorts usage for user: ${userId}`);
        const result = await User.findByIdAndUpdate(userId, { $inc: { shortsUsage: 1 } }, { new: true });
        console.log(`New usage for user ${userId}: ${result?.shortsUsage}`);
    } catch (error) {
        console.error('Failed to increment usage:', error);
    }
};
