import { Request, Response } from "express";
import z from "zod";
import { getProductsUseCase } from "../../useCases/product/getProductsUseCase";

export async function getProductsController(req: Request, res: Response) {
	const search = z.string().parse(req.params.search);

	const all = await getProductsUseCase(search);
	res.json({
		all,
		branded: [],
		suggested: [],
	});
}
