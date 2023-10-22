import { Request, Response } from "express";
import z from "zod";

import { deleteListUseCase } from "../../useCases/list/deleteListUseCase";

export async function deleteListController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const id = z.coerce.number().int().positive().parse(req.params.id);

	const deletedList = await deleteListUseCase({ id, userId });
	res.json(deletedList);
}
