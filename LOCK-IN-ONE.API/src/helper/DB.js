import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
    try {
        console.log("Trying to connect MongoDB!");
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connection successful!\n");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};

export default ConnectDB;