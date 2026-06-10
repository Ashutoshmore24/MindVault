import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);
    

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB connection error:', err);
});