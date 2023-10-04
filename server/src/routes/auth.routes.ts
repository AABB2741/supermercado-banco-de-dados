import { Router } from "express";

import { SignUpController } from "../controllers/auth/SignUpController";

const authRoutes = Router();

authRoutes.post("/signup", authRoutes);

export default authRoutes;
