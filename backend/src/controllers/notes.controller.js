import Note from '../models/Note.js';

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});  //newest one
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message : "Internal Server Error in Fetching Notes" });
        console.log("Error fetching notes:", error);
    }
    
}
    
async function getNoteById(req, res) {
    try {
        const existingNote = await Note.findById(req.params.id);
        if (!existingNote) return res.status(404).json({ message: `Note with id:${req.params.id} Not Found` });

        res.status(200).json({ existingNote });
    } catch (error) {
        console.log("Error in Fetching this Note");
        res.status(500).json({ message: "Internal Server Error" });

    }
    
}

async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        // note object
        const newNote = new Note(
            {
                title,
                content
            });

        const savedNote = await newNote.save();
        res.status(201).json({ savedNote});
    } catch (error) {
        console.log("Error in creating Note");
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {new:true});
        if (!updatedNote) {
            return res.status(404).json({ message: "Note Not Found" });
        }
        res.status(200).json({updatedNote});

    } catch (error) {
        console.log("Error in updating the Note")
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(500).json({message:"Note not found"})
        }
        res.status(200).json({ deletedNote });

    } catch (error) {
        console.log("Unable to perform Deletion");
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}
export { getAllNotes,getNoteById , createNote , updateNote ,deleteNote };