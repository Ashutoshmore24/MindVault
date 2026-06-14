import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import './auth/google.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true, // Prevents XSS scripts from reading the cookie
    sameSite: 'lax' ,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);
app.use('/auth', authRoutes);
    

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB connection error:', err);
});
