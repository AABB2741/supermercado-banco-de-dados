import { Router } from "express";

import authRoutes from "./auth.routes";
import listRoutes from "./list.routes";

const routes = Router();

// Todas as rotas da API
routes.use("/auth", authRoutes);
routes.use("/lists", listRoutes);

export default routes;
