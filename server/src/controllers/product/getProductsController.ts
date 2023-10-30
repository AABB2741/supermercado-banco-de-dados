import { Request, Response } from "express";
import z from "zod";

import { getProductsUseCase } from "../../useCases/product/getProductsUseCase";

export async function getProductsController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const search = z.string().optional().parse(req.params.search);
	const products = await getProductsUseCase(userId, search);
	res.json(products);
}
