import { Request, Response } from "express";
import z from "zod";

import { checkListUseCase } from "../../useCases/list/checkListUseCase";

export async function checkListController(req: Request, res: Response) {
	const id = z.coerce.number().int().positive().parse(req.params.id);

	const list = await checkListUseCase(id);
	res.json(list);
}
