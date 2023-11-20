import { Request, Response } from "express";
import { z } from "zod";

import { getRecipeUseCase } from "../../useCases/recipe/getRecipeUseCase";

export async function getRecipeController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const id = z.coerce.number().int().positive().parse(req.params.id);

	const recipe = await getRecipeUseCase(id, userId);
	res.json(recipe);
}
