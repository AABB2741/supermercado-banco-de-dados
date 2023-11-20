import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { getRecipeController } from "../controllers/recipe/getRecipeController";
import { getRecipesController } from "../controllers/recipe/getRecipesController";
import { getSuggestedRecipesController } from "../controllers/recipe/getSuggestedRecipesController";

const recipeRoutes = Router();

recipeRoutes.use(authHandler);

recipeRoutes.get("/", getRecipesController);
recipeRoutes.get("/suggested", getSuggestedRecipesController);
recipeRoutes.get("/:id", getRecipeController);

export default recipeRoutes;
