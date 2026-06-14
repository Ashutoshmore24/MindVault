import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: [{
        value: String,
        type: String
    }],
    avatar: [{
        value: String,
        type: String
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;