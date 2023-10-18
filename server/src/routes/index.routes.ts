import { Router } from "express";

import authRoutes from "./auth.routes";
import listRoutes from "./list.routes";
// import productRoutes from "./product.routes";

const routes = Router();

// Todas as rotas da API
routes.use("/auth", authRoutes);
routes.use("/lists", listRoutes);
// routes.use("/products", productRoutes);

export default routes;
