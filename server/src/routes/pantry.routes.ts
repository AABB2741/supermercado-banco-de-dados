import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getPantryItemsController } from "../controllers/pantry/getPantryItemsController";

const pantryRoutes = Router();

pantryRoutes.use(authHandler);

pantryRoutes.get("/items", getPantryItemsController);

export default pantryRoutes;
