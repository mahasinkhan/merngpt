import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';
// Define the schema for the Chat model
const chatSchema = new Schema({
    id: {
        type: String,
        default: randomUUID(),
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Create the Chat model from the schema
const Chat = mongoose.model('Chat', chatSchema);
// Define the schema for the User model
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Email regex validation
    },
    password: {
        type: String,
        required: true,
    },
    chats: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Chat', // Reference to the Chat model
        },
    ],
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Create the User model from the schema
const User = mongoose.model('User', userSchema);
export default User; // Export both User and Chat models
//# sourceMappingURL=User.js.map