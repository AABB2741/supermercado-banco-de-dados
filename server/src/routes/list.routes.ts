import { Router } from "express";

import { authHandler } from "../middlewares/authHandler";

import { createListController } from "../controllers/list/createListController";
import { getListsController } from "../controllers/list/getListsController";
import { getListController } from "../controllers/list/getListController";
import { addListItemController } from "../controllers/list/addListItemController";
import { editListItemController } from "../controllers/list/editListItemController";
import { deleteListController } from "../controllers/list/deleteListController";
import { toggleListController } from "../controllers/list/toggleListController";

const listRoutes = Router();

listRoutes.use(authHandler);

listRoutes.get("/", getListsController);
listRoutes.get("/:id", getListController);
listRoutes.post("/create", createListController);
listRoutes.post("/add/:id", addListItemController);
listRoutes.put("/items/edit/:id", editListItemController);
listRoutes.delete("/delete/:id", deleteListController);
listRoutes.put("/toggle/:id", toggleListController);

export default listRoutes;
