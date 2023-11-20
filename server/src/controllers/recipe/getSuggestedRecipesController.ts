import { Request, Response } from "express";
import z from "zod";

import { getSuggestedRecipesUseCase } from "../../useCases/recipe/getSuggestedRecipesUseCase";

export async function getSuggestedRecipesController(
	req: Request,
	res: Response
) {
	const userId = z.number().int().positive().parse(req.userId);

	const suggestions = await getSuggestedRecipesUseCase(userId);
	res.json(suggestions);
}
