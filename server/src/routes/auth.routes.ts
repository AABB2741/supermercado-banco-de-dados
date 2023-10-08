import { Router } from "express";

import { loginController } from "../controllers/auth/loginController";
import { signUpController } from "../controllers/auth/signUpController";

const authRoutes = Router();

authRoutes.post("/login", loginController);
authRoutes.post("/signup", signUpController);

export default authRoutes;
