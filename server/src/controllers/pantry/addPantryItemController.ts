import { Request, Response } from "express";
import z from "zod";

import { addPantryItemUseCase } from "../../useCases/pantry/addPantryItemUseCase";
import { AppError } from "../../errors/AppError";

export async function addPantryItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const bodySchema = z.object({
		productId: z.number().int().positive(),
		amount: z.number().positive(),
	});

	const { productId, amount } = bodySchema.parse(req.body);

	const pantryItem = await addPantryItemUseCase({
		userId,
		productId,
		amount,
	});

	res.json(pantryItem);
}
