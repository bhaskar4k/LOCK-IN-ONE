import express from 'express';
import clear from 'clear'
import cors from 'cors';

import ConnectDB from './src/helper/DB.js';
import InitializeRoutes from './src/helper/Routes.js';
import RunSeeders from './src/helper/Seeeder.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const AllowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [];

// Middleware
app.use(express.json());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || AllowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: ['Content-Disposition'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Start Server
app.listen(PORT, async () => {
  clear();
  await ConnectDB();
  InitializeRoutes(app);
  await RunSeeders();

  console.log(`API Server is running...\nBaseURL -> http://localhost:${PORT}`);
});
