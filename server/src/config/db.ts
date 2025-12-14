import mongoose from 'mongoose';

export let dbError: string | null = null;

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            dbError = 'MONGO_URI not defined';
            console.error('❌ MONGODB ERROR: MONGO_URI environment variable is not defined!');
            return;
        }
        const conn = await mongoose.connect(uri, {
            // These are no longer needed in Mongoose 6+, but good for older versions awareness
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        dbError = null; // Clear error on success
    } catch (error) {
        dbError = String(error);
        console.error(`Error connecting to MongoDB: ${error}`);
        // process.exit(1); // Do not exit on serverless environment!
    }
};

export default connectDB;
