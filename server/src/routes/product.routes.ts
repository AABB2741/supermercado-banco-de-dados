import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getRecommendedProductsController } from "../controllers/product/getRecommendedProductsController";

const productRoutes = Router();

productRoutes.use(authHandler);

productRoutes.get("/recommended/:search", getRecommendedProductsController);
productRoutes.get("/recommended/", getRecommendedProductsController);

export default productRoutes;
