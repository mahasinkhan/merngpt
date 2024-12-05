import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Signup validator
const signupValidator: ValidationChain[] = [
    body("name").notEmpty().withMessage("Name is required"), // Validate that the name is not empty
    body("email").isEmail().withMessage("Please enter a valid email address"), // Validate the email format
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"), // Validate password length
];

// Login validator
const loginValidator: ValidationChain[] = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Chat completion validator
const chatCompletionValidator: ValidationChain[] = [
    body("message").notEmpty().withMessage("Message is required"),
];

// Reusable validation middleware
const validate =
    (validations: ValidationChain[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        // Run all validations
        await Promise.all(validations.map((validation) => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Proceed to the next middleware or controller
        next();
    };

export { signupValidator, loginValidator, chatCompletionValidator, validate };
