import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    userId: string;
    title: string;
    description?: string;
    status: 'draft' | 'processing' | 'completed' | 'failed';
    duration?: string;
    numberOfClips?: number;
    processingProgress?: number;
    videoUrl?: string;
    videoPath?: string;
    outputPath?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['draft', 'processing', 'completed', 'failed'], default: 'draft' },
    duration: { type: String },
    numberOfClips: { type: Number, default: 10 },
    processingProgress: { type: Number, default: 0 },
    videoUrl: { type: String },
    videoPath: { type: String },
    outputPath: { type: String }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

// Wrapper to match existing controller calls (simplifies refactoring)
export const projectModel = {
    findByUserId: async (userId: string) => {
        return await Project.find({ userId }).sort({ createdAt: -1 });
    },

    findById: async (id: string) => {
        return await Project.findById(id);
    },

    create: async (projectData: any) => {
        return await Project.create(projectData);
    },

    update: async (id: string, updates: any) => {
        return await Project.findByIdAndUpdate(id, updates, { new: true });
    },

    delete: async (id: string) => {
        const result = await Project.findByIdAndDelete(id);
        return !!result;
    },

    getAll: async () => {
        return await Project.find({});
    }
};
