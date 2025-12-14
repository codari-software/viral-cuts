import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '', {
            // These are no longer needed in Mongoose 6+, but good for older versions awareness
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        // process.exit(1); // Do not exit on serverless environment!
    }
};

export default connectDB;
