import { Request, Response } from "express";
import z from "zod";

import { getListUseCase } from "../../useCases/list/getListUseCase";

export async function getListController(req: Request, res: Response) {
	const userId = z.coerce.number().parse(req.userId);
	const listId = z.coerce.number().parse(req.params?.id);

	const list = await getListUseCase({ userId, listId });
	res.json(list);
}
