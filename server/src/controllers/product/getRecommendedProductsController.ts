import { Request, Response } from "express";
import z from "zod";
import { getRecommendedProductsUseCase } from "../../useCases/product/getRecommendedProductsUseCase";

export async function getRecommendedProductsController(
	req: Request,
	res: Response
) {
	const search = z.string().optional().parse(req.params.search);
	console.log("Obtendo produtos recomendados: " + search);

	const all = await getRecommendedProductsUseCase(search);
	res.json({
		all,
		branded: [],
		suggested: [],
	});
}
