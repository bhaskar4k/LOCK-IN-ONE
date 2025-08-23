import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connection successful!");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};

export default ConnectDB;