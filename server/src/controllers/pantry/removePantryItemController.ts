import { Request, Response } from "express";
import z from "zod";
import { removePantryItemUseCase } from "../../useCases/pantry/removePantryItemUseCase";

export async function removePantryItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const id = z.number().int().positive().parse(req.params.id);

	const removedItem = await removePantryItemUseCase({ id, userId });
	res.json(removedItem);
}
