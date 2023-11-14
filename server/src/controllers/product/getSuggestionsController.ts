import { Request, Response } from "express";
import z from "zod";

import { getSuggestionsUseCase } from "../../useCases/product/getSuggestionsUseCase";

export async function getSuggestionsController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const listId = z.coerce.number().int().positive().parse(req.params.id);

	const suggestions = await getSuggestionsUseCase(userId, listId);
	res.json(suggestions);
}
