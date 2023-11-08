import { Request, Response } from "express";
import z from "zod";

import { editProductUseCase } from "../../useCases/product/editProductUseCase";

export async function editProductController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const productId = z.coerce.number().int().positive().parse(req.params.id);

	const bodySchema = z.object({
		price: z.number().positive().optional(),
		brand: z.string().min(1).max(100).optional(),
	});
	const data = bodySchema.parse(req.body);

	const product = await editProductUseCase({ userId, productId, data });
	res.json(product);
}
