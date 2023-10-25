import { Request, Response } from "express";
import z from "zod";

import { toggleListUseCase } from "../../useCases/list/toggleListUseCase";

export async function toggleListController(req: Request, res: Response) {
	const id = z.coerce.number().int().positive().parse(req.params.id);

	const list = await toggleListUseCase(id);
	res.json(list);
}
