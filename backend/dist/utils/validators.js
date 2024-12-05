import { body, validationResult } from "express-validator";
// Signup validator
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"), // Validate password length
];
// Login validator
const loginValidator = [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
// Chat completion validator
const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
// Reusable validation middleware
const validate = (validations) => async (req, res, next) => {
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
//# sourceMappingURL=validators.js.map