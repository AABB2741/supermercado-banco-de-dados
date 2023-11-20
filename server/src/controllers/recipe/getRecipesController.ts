import { Request, Response } from "express";
import { z } from "zod";

import { getRecipesUseCase } from "../../useCases/recipe/getRecipesUseCase";

export async function getRecipesController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const response = await getRecipesUseCase(userId);
	res.json(response);
}
