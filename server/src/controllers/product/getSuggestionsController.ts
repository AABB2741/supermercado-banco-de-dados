import { Request, Response } from "express";
import z from "zod";

import { getSuggestedProductsUseCase } from "../../useCases/product/getSuggestedProductsUseCase";

export async function getSuggestionsController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const suggestions = await getSuggestedProductsUseCase(userId);
	res.json(suggestions);
}
