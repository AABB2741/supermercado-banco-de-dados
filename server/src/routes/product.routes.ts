import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getRecommendedProductsController } from "../controllers/product/getRecommendedProductsController";
import { createProductController } from "../controllers/product/createProductController";
import { getProductController } from "../controllers/product/getProductController";

const productRoutes = Router();

productRoutes.use(authHandler);

productRoutes.get("/recommended/", getRecommendedProductsController);
productRoutes.post("/create", createProductController);
productRoutes.get("/:id", getProductController);

export default productRoutes;
