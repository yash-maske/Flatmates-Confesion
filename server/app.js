import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import message from './routes/message.js';

const DATABASE_URL = process.env.DATABASE_URI; 
const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://flatmates-confesion-15wz.vercel.app"
  ]
}));

app.use(express.json());

// Use distinct base paths for routes
app.use("/api/user", userRoutes);
app.use("/api/message", message);

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    hii: true
  });
});

// Connect DB then start server
connectDB(DATABASE_URL).then(() => {
  console.log('MongoDB connected successfully');
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start server due to DB connection error:', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});
