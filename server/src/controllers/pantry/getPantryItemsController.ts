import { Request, Response } from "express";
import z from "zod";

import { getPantryItemsUseCase } from "../../useCases/pantry/getPantryItemsUseCase";

export async function getPantryItemsController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const pantryItems = await getPantryItemsUseCase(userId);
	res.json(pantryItems);
}
