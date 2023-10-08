import { Request, Response } from "express";
import z from "zod";
import { GetListsUseCase } from "../../useCases/list/GetListsUseCase";

export async function GetListsController(req: Request, res: Response) {
	const userId = z
		.number({
			invalid_type_error: "unauthorized",
			required_error: "bad_request",
		})
		.int()
		.positive()
		.parse(req.userId);

	const lists = await GetListsUseCase(userId);
	res.json(lists);
}
