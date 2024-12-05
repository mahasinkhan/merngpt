import { Router } from "express";
import { getAllusers, userSignup, userLogin, verifyUser, userLogout, } from "../controllers/user-controllers.js"; // Controller functions
import { signupValidator, loginValidator, validate, } from "../utils/validators.js"; // Import validation logic
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
// Define the route for getting all users
userRoutes.get("/", getAllusers);
// Define the route for user signup
userRoutes.post("/signup", validate(signupValidator), userSignup);
// Define the route for user login
userRoutes.post("/login", validate(loginValidator), userLogin);
// Define the route for checking authentication status
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-router.js.map