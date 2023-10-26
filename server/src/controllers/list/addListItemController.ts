import { Request, Response } from "express";
import z from "zod";

import { addListItemUseCase } from "../../useCases/list/addListItemUseCase";

import { AppError } from "../../errors/AppError";

export async function addListItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const listId = z.coerce.number().int().positive().parse(req.params.id);

	const bodySchema = z.object({
		productId: z.number().int().positive(),
		amount: z.number().positive(),
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
