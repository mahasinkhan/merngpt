import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;

    // Ensure the message is provided
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Log the received message for debugging (can remove in production)
    console.log("Received message:", message);

    // Ensure JWT has user ID and user exists
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Fetch the user from the database using the ID from JWT
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      console.log("User not found or invalid token");
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    // Prepare the user's chat history (ensure it's not too large)
    const chats = user.chats.map(({ role, content }) => ({ role, content }));

    // Limit chat history size (example: last 10 messages)
    const maxHistorySize = 10;
    const chatHistoryToSend = chats.slice(Math.max(chats.length - maxHistorySize, 0));

    // Add the new user message to the history
    chatHistoryToSend.push({ role: "user", content: message });

    // Log the user's chat history (can remove in production)
    console.log("User's chat history:", chatHistoryToSend);

    // Configure the OpenAI client
    const openai = configureOpenAI();

    // Create the chat completion request to the OpenAI API
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Can use "gpt-4" if needed
      messages: chatHistoryToSend,
      max_tokens: 150,
      temperature: 0.7,
    });

    // Validate OpenAI response
    if (!chatResponse || !chatResponse.choices || !chatResponse.choices[0]?.message?.content) {
      console.error("OpenAI response invalid or empty:", chatResponse);
      return res.status(500).json({ message: "OpenAI API failed to process the request." });
    }

    // Get the response message from OpenAI
    const completion = chatResponse.choices[0]?.message?.content;

    // Save the response in the user's chat history
    user.chats.push({ role: "assistant", content: completion });
    await user.save();

    // Log the stored chat history (can remove in production)
    console.log("Stored new chat in user history:", user.chats);

    // Send the response back to the client
    res.status(200).json({
      success: true,
      message: completion || "No response generated",
    });
  } catch (error) {
    console.error("Error generating chat completion:", error);
    next(error);  // Forward the error to the error-handling middleware
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the user's ID from the JWT payload in res.locals
    const userId = res.locals.jwtData?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid or missing token" });
    }

    // Find the user in the database
    const user = await User.findById(userId).populate('chats'); // Populate if chats are references

    if (!user) {
      return res.status(401).json({ success: false, message: "User not registered or token malfunctioned" });
    }

    // Ensure the user ID from the JWT matches the database record
    if (user.id.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Permissions didn't match" });
    }

    // Respond with user information
    return res.status(200).json({
      success: true,
      message: "OK",
      chats: user.chats,
    });
  } catch (error) {
    console.error("Error in sendChatsToUser:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};


export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.jwtData?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid or missing token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    user.chats = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
      chats: user.chats,
    });
  } catch (error) {
    console.error("Error deleting user chats:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};
