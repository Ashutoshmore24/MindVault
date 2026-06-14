import express from 'express';
import { getAllNotes ,getNoteById, createNote, updateNote, deleteNote} from '../controllers/notes.controller.js';

const router = express.Router();

// Auth Middleware: Rejects any request if the user is not logged in via Google
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Access Denied: Please log in to view your MindVault." });
    }

    return next();
    
});

router.get('/', getAllNotes); 
router.get('/:id', getNoteById)
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;