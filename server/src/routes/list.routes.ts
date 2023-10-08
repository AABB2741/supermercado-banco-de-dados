import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { CreateListController } from "../controllers/list/CreateListController";
import { GetListsController } from "../controllers/list/GetListsController";
import { GetListController } from "../controllers/list/GetListController";

const listRoutes = Router();

listRoutes.use(authHandler);

listRoutes.get("/", GetListsController);
listRoutes.get("/:id", GetListController);
listRoutes.post("/create", CreateListController);

export default listRoutes;
