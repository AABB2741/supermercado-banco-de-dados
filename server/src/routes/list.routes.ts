import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { createListController } from "../controllers/list/createListController";
import { getListsController } from "../controllers/list/getListsController";
import { getListController } from "../controllers/list/getListController";

const listRoutes = Router();

listRoutes.use(authHandler);

listRoutes.get("/", getListsController);
listRoutes.get("/:id", getListController);
listRoutes.post("/create", createListController);

export default listRoutes;
