import { Router } from "express";

import authRoutes from "./auth.routes";

const routes = Router();

// Todas as rotas da API
routes.use("/auth", authRoutes);

export default routes;
