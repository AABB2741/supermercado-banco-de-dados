import { Request, Response } from "express";
import z from "zod";

import { getListsUseCase } from "../../useCases/list/getListsUseCase";

export async function getListsController(req: Request, res: Response) {
	const userId = z
		.number({
			invalid_type_error: "unauthorized",
			required_error: "bad_request",
		})
		.int()
		.positive()
		.parse(req.userId);
	console.log("Obtendo listas do usuario " + userId);
	const lists = await getListsUseCase(userId);
	res.json(lists);
}
