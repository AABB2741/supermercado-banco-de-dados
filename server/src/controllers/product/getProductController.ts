import { Request, Response } from "express";
import z from "zod";

import { getProductUseCase } from "../../useCases/product/getProductUseCase";

export async function getProductController(req: Request, res: Response) {
	const id = z.coerce.number().int().positive().parse(req.params.id);

	const product = await getProductUseCase(id);
	res.json(product);
}
