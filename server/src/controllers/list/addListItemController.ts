import { Request, Response } from "express";
import z from "zod";

import { addListItemUseCase } from "../../useCases/list/addListItemUseCase";

export async function addListItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const listId = z.number().int().positive().parse(req.params.id);

	const bodySchema = z.object({
		amount: z.number().int().positive().optional(),
		productId: z.number().int().positive(),
	});

	const { amount, productId } = bodySchema.parse(req.body);

	const item = await addListItemUseCase({
		userId,
		listId,
		amount,
		productId,
	});

	res.json(item);
}
