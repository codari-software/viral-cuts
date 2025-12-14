import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../models/User';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedUser = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI not found');

        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const email = 'admin@codariapp.com.br';
        const password = process.env.ADMIN_PASSWORD;
        if (!password) throw new Error('ADMIN_PASSWORD not set in .env');
        const name = 'Admin User';

        // Check if user exists
        const existingUser = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            console.log('Admin user already exists. Updating password...');
            existingUser.password = hashedPassword;
            existingUser.plan = 'agency';
            existingUser.shortsUsage = 0;
            await existingUser.save();
            console.log(`✅ Admin user updated: ${email}`);
        } else {
            const user = new User({
                email,
                password: hashedPassword,
                name,
                plan: 'agency',
                shortsUsage: 0,
                cycleStartDate: new Date(),
            });
            await user.save();
            console.log(`✅ Admin user created: ${email}`);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding user:', error);
        process.exit(1);
    }
};

seedUser();
