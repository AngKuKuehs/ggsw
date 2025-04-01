import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const DB_URIS = {
    dev: process.env.MONGO_URI_DEV,
    prod: process.env.MONGO_URI,
};

const connectDB = async () => {
    try {
        const environment = process.env.NODE_ENV;
        const mongoUri = DB_URIS[environment];

        if (!mongoUri) throw new Error(`MongoDB URI missing for ${environment} environment`);
        if (!["dev", "prod"].includes(environment)) {
            throw new Error("Invalid DB Environment. Use 'dev' or 'test'");
        }

        console.log(`Connecting to ${environment} DB: ${mongoUri}`);
        await mongoose.connect(mongoUri);
        console.log(`Successfully connected to ${environment} DB`);
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;