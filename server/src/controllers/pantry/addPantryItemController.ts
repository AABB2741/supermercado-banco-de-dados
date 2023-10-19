import { Request, Response } from "express";
import z from "zod";

import { addPantryItemUseCase } from "../../useCases/pantry/addPantryItemUseCase";
import { AppError } from "../../errors/AppError";

export async function addPantryItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const bodySchema = z.object({
		isOffline: z.boolean(),
		productId: z.number().int().positive().optional(),
		offlineProductId: z.number().int().positive().optional(),
		amount: z.number().positive(),
	});

	const { isOffline, productId, offlineProductId, amount } = bodySchema.parse(
		req.body
	);

	if (isOffline && !offlineProductId) throw new AppError("bad_request", 400);
	if (!isOffline && !productId) throw new AppError("bad_request", 400);

	const pantryItem = await addPantryItemUseCase({
		userId,
		isOffline,
		productId,
		offlineProductId,
		amount,
	});

	res.json(pantryItem);
}
