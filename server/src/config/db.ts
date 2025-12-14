import mongoose from 'mongoose';

export let dbError: string | null = null;

// Define interface for the cached mongoose connection
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Add strict typing for the global object
declare global {
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        dbError = 'MONGO_URI not defined';
        console.error('❌ MONGODB ERROR: MONGO_URI environment variable is not defined!');
        throw new Error('MONGO_URI not defined');
    }

    if (cached!.conn) {
        console.log('📦 Using cached MongoDB connection');
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        console.log('🔄 Creating new MongoDB connection...');
        cached!.promise = mongoose.connect(uri, opts).then((mongoose) => {
            console.log(`✅ New MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        }).catch(err => {
            console.error('❌ MongoDB Connection Error:', err);
            throw err;
        });
    }

    try {
        cached!.conn = await cached!.promise;
        dbError = null;
    } catch (e) {
        cached!.promise = null;
        dbError = String(e);
        throw e;
    }

    return cached!.conn;
};

export default connectDB;
