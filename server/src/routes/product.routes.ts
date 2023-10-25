import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getRecommendedProductsController } from "../controllers/product/getRecommendedProductsController";
import { createProductController } from "../controllers/product/createProductController";

const productRoutes = Router();

productRoutes.use(authHandler);

productRoutes.get("/recommended/", getRecommendedProductsController);
productRoutes.post("/create", createProductController);

export default productRoutes;
