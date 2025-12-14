import { Request, Response } from 'express';
import User from '../models/User';
import { emailService } from '../services/email';
import bcrypt from 'bcryptjs';

export const handleCaktoWebhook = async (req: Request, res: Response) => {
    try {
        console.log('[Webhook] Received Cakto event:', JSON.stringify(req.body, null, 2));

        // Cakto Payload Structure (Estimated - Adapt based on real logs)
        // Usually contains: status, customer { email, name }, product { name }
        const { state, status, customer, product_name } = req.body;

        // Check for approval status (Cakto uses 'paid' or 'approved')
        const isApproved = state === 'paid' || status === 'paid' || status === 'approved';

        if (!isApproved) {
            console.log('[Webhook] Ignoring non-approved status:', state || status);
            return res.json({ received: true });
        }

        const email = customer?.email;
        const name = customer?.name || 'Cliente';
        // Map product name to plan key ('creator', 'pro', 'agency')
        const productName = (product_name || '').toLowerCase();
        let plan: 'creator' | 'pro' | 'agency' = 'creator';

        if (productName.includes('pro')) plan = 'pro';
        else if (productName.includes('agency')) plan = 'agency';

        if (!email) {
            console.error('[Webhook] No email found in payload');
            return res.status(400).json({ error: 'No email provided' });
        }

        // Logic to create/update user
        let user = await User.findOne({ email });
        let password = '';

        if (!user) {
            // Create new user
            password = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({
                name,
                email,
                password: hashedPassword,
                plan,
                shortsUsage: 0,
                cycleStartDate: new Date()
            });
            console.log(`[Webhook] Created new user: ${email} with plan ${plan}`);
        } else {
            // Update existing user
            user.plan = plan;
            await user.save();
            console.log(`[Webhook] Updated existing user: ${email} to plan ${plan}`);
        }

        // Send Email
        await emailService.sendPaymentConfirmation(email, name, plan, password);

        res.json({ success: true, message: 'Processed' });
    } catch (error) {
        console.error('[Webhook] Error processing event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
