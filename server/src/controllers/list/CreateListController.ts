import { Request, Response } from "express";
import z from "zod";
import { CreateListUseCase } from "../../useCases/list/CreateListUseCase";

export async function CreateListController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	console.log("Criando lista para usuário " + userId);

	const bodySchema = z.object({
		name: z.string().min(1).max(100),
		color: z.string(), // TODO: colocar REGEX de cor
	});

	const data = bodySchema.parse(req.body);
	const list = await CreateListUseCase({ ...data, userId });
	res.json(list.id);
}
