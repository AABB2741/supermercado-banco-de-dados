import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getPantryItemsController } from "../controllers/pantry/getPantryItemsController";
import { addPantryItemController } from "../controllers/pantry/addPantryItemController";
import { editPantryItemController } from "../controllers/pantry/editPantryItemController";
import { removePantryItemController } from "../controllers/pantry/removePantryItemController";

const pantryRoutes = Router();

pantryRoutes.use(authHandler);

pantryRoutes.get("/items", getPantryItemsController);
pantryRoutes.post("/add", addPantryItemController);
pantryRoutes.put("/edit/:id", editPantryItemController);
pantryRoutes.delete("/remove/:id", removePantryItemController);

export default pantryRoutes;
