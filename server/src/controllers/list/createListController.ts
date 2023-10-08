import { Request, Response } from "express";
import z from "zod";
import { createListUseCase } from "../../useCases/list/createListUseCase";

export async function createListController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);

	const bodySchema = z.object({
		name: z.string().min(1).max(100),
		color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/), // TODO: colocar REGEX de cor
	});

	const data = bodySchema.parse(req.body);
	const list = await createListUseCase({ ...data, userId });
	res.json(list);
}
