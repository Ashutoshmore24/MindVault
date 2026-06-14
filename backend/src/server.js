import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import './auth/google.js';


dotenv.config();

const app = express();

// Trust Render's reverse proxy
app.set('trust proxy', 1); 

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }))
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions', // Creates a new clean collection in notes_db
    ttl: 14 * 24 * 60 * 60 // Sessions expire automatically after 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true, // Prevents XSS scripts from reading the cookie
    sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Adjust sameSite for production
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
// app.use(rateLimiter);

app.use('/api/notes', notesRoutes);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });

}
    

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB connection error:', err);
});