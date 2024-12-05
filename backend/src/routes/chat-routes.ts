import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";


const chatRoutes = Router();

chatRoutes.post(
  "/new",
  verifyToken,
  validate(chatCompletionValidator),
  generateChatCompletion // Corrected function name
);

chatRoutes.get(
  "/all-chats",
  verifyToken,sendChatsToUser
);

chatRoutes.delete("/delete", verifyToken, deleteChats);


export default chatRoutes;
