import mongoose, { Schema, Document } from 'mongoose';
import { User as UserType } from '../types';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    plan: 'creator' | 'pro' | 'agency';
    shortsUsage: number;
    cycleStartDate: Date;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    plan: { type: String, enum: ['creator', 'pro', 'agency'], default: 'creator' },
    shortsUsage: { type: Number, default: 0 },
    cycleStartDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password; // Also good security practice to hide password hash
        }
    }
});

export default mongoose.model<IUser>('User', UserSchema);
