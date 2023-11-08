import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { createProductController } from "../controllers/product/createProductController";
import { getProductController } from "../controllers/product/getProductController";
import { getProductsController } from "../controllers/product/getProductsController";
import { editProductController } from "../controllers/product/editProductController";

const productRoutes = Router();

productRoutes.use(authHandler);

productRoutes.post("/create", createProductController);
productRoutes.get("/get/:search", getProductsController);
productRoutes.get("/get", getProductsController);
productRoutes.get("/:id", getProductController);
productRoutes.put("/edit/:id", editProductController);

export default productRoutes;
