import { Router } from "express";

import { LoginController } from "../controllers/auth/LoginController";
import { SignUpController } from "../controllers/auth/SignUpController";

const authRoutes = Router();

authRoutes.post("/login", LoginController);
authRoutes.post("/signup", SignUpController);

export default authRoutes;
