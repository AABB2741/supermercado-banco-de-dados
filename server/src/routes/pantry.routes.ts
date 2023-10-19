import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getPantryItemsController } from "../controllers/pantry/getPantryItemsController";
import { addPantryItemController } from "../controllers/pantry/addPantryItemController";

const pantryRoutes = Router();

pantryRoutes.use(authHandler);

pantryRoutes.get("/items", getPantryItemsController);
pantryRoutes.post("/add", addPantryItemController);

export default pantryRoutes;
