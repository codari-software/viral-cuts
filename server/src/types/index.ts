export interface User {
    id: string;
    email: string;
    password: string; // In production, this would be hashed
    name: string;
    plan: 'creator' | 'pro' | 'agency';
    shortsUsage: number;
    cycleStartDate: Date;
    createdAt: Date;
}

export interface Project {
    id: string;
    userId: string;
    title: string;
    description?: string;
    status: 'draft' | 'processing' | 'completed' | 'failed';
    duration?: string;
    numberOfClips?: number;
    createdAt: Date;
    updatedAt: Date;
    processingProgress?: number;
    videoUrl?: string;
    videoPath?: string;  // Path to uploaded video
    outputPath?: string; // Path to processed video
}

export interface AuthResponse {
    token: string;
    user: Omit<User, 'password'>;
}

export interface ProcessingJob {
    id: string;
    projectId: string;
    type: 'auto-silence' | 'captions' | 'crop-9-16';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    createdAt: Date;
}

export interface Order {
    txid: string;
    customer: {
        name: string;
        email: string;
    };
    plan: string;
    amount: number;
    status: 'PENDING' | 'PAID';
    emailSent: boolean;
    createdAt: Date;
}
