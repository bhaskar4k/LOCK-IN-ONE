import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API');
});

// Start Server
app.listen(PORT, () => {
  console.log(`API Server is running at http://localhost:${PORT}`);
});
