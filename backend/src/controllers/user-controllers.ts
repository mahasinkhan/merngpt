import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Import User model
import { createToken } from "../utils/token-manager.js"; // Import token manager function
import { COOKIE_NAME } from "../utils/constants.js"; // Make sure COOKIE_NAME is defined in constants.js

// Get all users
export const getAllusers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
        next(error);
    }
};

// User signup
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Clear any existing cookies
        res.clearCookie(COOKIE_NAME);

        // Generate token with 7-day expiration
        const token = createToken(newUser._id.toString(), newUser.email, "7d");

        // Set cookie expiration to 7 days from now
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Expire in 7 days

        // Set the token as an HTTP-only cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.COOKIE_DOMAIN || "localhost", // Use domain from env or localhost by default
            expires,
            httpOnly: true,
            signed: true,
             
        });

        res.status(201).json({
            message: "User created successfully",
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup", error: error.message });
        next(error);
    }
};

// User login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Clear any existing cookies
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: process.env.COOKIE_DOMAIN || "localhost",
            httpOnly: true,
            signed: true,
        });

        // Generate token with 7-day expiration
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");

        // Set cookie expiration to 7 days from now
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // Expire in 7 days

        // Set the token as an HTTP-only cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.COOKIE_DOMAIN || "localhost", // Use domain from env or localhost by default
            expires,
            httpOnly: true,
            signed: true,
             // Only set secure cookies in production
        });

        res.status(200).json({
            message: "Login successful",
            name: existingUser.name,
            email: existingUser.email,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
        next(error);
    }
};



// User 
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      // Find user by ID from JWT data
      const user = await User.findById(res.locals.jwtData.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Optionally, check if the decoded ID matches the ID in the database, for safety
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(403).json({ message: "Permission mismatch" });
      }
  
      // If user exists and ID matches, proceed to next middleware or route handler
      res.status(200).json({
        message: "User verified successfully",
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Error during verification:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
      next(error);  // Pass error to the next middleware (if any)
    }
  };
  

  export const userLogout= async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      // Find user by ID from JWT data
      const user = await User.findById(res.locals.jwtData.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Optionally, check if the decoded ID matches the ID in the database, for safety
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(403).json({ message: "Permission mismatch" });
      }

      res.cookie(COOKIE_NAME, {
        path: "/",
        domain: process.env.COOKIE_DOMAIN || "localhost", // Use domain from env or localhost by default
        httpOnly: true,
        signed: true,
         // Only set secure cookies in production
    });

  
      // If user exists and ID matches, proceed to next middleware or route handler
      res.status(200).json({
        message: "User verified successfully",
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Error during verification:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
      next(error);  // Pass error to the next middleware (if any)
    }
  };
  