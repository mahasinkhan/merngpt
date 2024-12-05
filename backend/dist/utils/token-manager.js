import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn = "7d") => {
    if (!id || !email) {
        throw new Error("ID and email are required to create a token");
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id, email }, secret, { expiresIn });
};
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.signedCookies[COOKIE_NAME] || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET not set in environment variables");
            return res.status(500).json({ message: "Internal server error" });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            res.locals.user = decoded;
            next();
        });
    }
    catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=token-manager.js.map