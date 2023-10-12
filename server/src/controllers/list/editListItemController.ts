import { Request, Response } from "express";
import z from "zod";

import { editListItemUseCase } from "../../useCases/list/editListItemUseCase";

export async function editListItemController(req: Request, res: Response) {
	const id = z.coerce.number().int().positive().parse(req.params.id);
	const bodySchema = z.object({
		checked: z.boolean().optional(),
	});
	const data = bodySchema.parse(req.body);

	const listItem = await editListItemUseCase({ id, ...data });
	res.json(listItem);
}
