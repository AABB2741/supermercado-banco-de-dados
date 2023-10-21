import { Request, Response } from "express";
import z from "zod";
import { editPantryItemUseCase } from "../../useCases/pantry/editPantryItemUseCase";

export async function editPantryItemController(req: Request, res: Response) {
	const userId = z.number().int().positive().parse(req.userId);
	const id = z.number().int().positive().parse(req.params.id);

	const bodySchema = z.object({
		amount: z.number().positive().optional(),
	});

	const data = bodySchema.parse(req.body);

	const editedItem = await editPantryItemUseCase({ userId, id, ...data });
	res.json(editedItem);
}
