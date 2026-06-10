import mongoose, { model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const Note = mongoose.model("Note",noteSchema);

export default Note;