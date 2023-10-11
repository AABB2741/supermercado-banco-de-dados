import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getProductsController } from "../controllers/product/getProductsController";

const productRoutes = Router();

productRoutes.use(authHandler);

productRoutes.get("/:search", getProductsController);

export default productRoutes;
