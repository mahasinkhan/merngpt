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
export default Chat;
//# sourceMappingURL=Chat.js.map