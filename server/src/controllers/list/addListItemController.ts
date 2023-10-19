import { Request, Response } from "express";
import z from "zod";

import { addListItemUseCase } from "../../useCases/list/addListItemUseCase";

import { AppError } from "../../errors/AppError";

export async function addListItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const listId = z.coerce.number().int().positive().parse(req.params.id);

	const bodySchema = z.object({
		productId: z.number().int().positive().optional(),
		offlineProductId: z.number().int().positive().optional(),
		amount: z.number().positive(),
		isOffline: z.boolean(),
	});

	const { amount, offlineProductId, productId, isOffline } = bodySchema.parse(
		req.body
	);

	if (!offlineProductId && !productId)
		throw new AppError("unknown_error", 401);

	const item = await addListItemUseCase({
		userId,
		listId,
		amount,
		productId,
		offlineProductId,
		isOffline,
	});

	res.json(item);
}
