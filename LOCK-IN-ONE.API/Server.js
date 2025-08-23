import express from 'express';
import ConnectDB from './src/helper/DB.js';
import RunSeeders from './src/helper/Seeeder.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Test API');
});

// Start Server
app.listen(PORT, async () => {
  await ConnectDB();
  await RunSeeders();
  console.log(`API Server is running at http://localhost:${PORT}`);
});
