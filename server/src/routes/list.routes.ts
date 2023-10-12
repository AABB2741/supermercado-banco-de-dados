import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { createListController } from "../controllers/list/createListController";
import { getListsController } from "../controllers/list/getListsController";
import { getListController } from "../controllers/list/getListController";
import { addListItemController } from "../controllers/list/addListItemController";

const listRoutes = Router();

listRoutes.use(authHandler);

listRoutes.get("/", getListsController);
listRoutes.get("/:id", getListController);
listRoutes.post("/create", createListController);
listRoutes.post("/add/:id", addListItemController);

export default listRoutes;
