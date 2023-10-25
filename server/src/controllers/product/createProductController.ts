import { Request, Response } from "express";
import z from "zod";

import { createProductUseCase } from "../../useCases/product/createProductUseCase";

export async function createProductController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const bodySchema = z.object({
		name: z.string().trim(),
		price: z.number().positive().optional(),
		dueTime: z.number().int().positive().optional(),
		brand: z.string().max(100).nonempty().optional(),
	});

	const data = bodySchema.parse(req.body);

	const product = await createProductUseCase({ ...data, userId });
	res.json(product);
}
