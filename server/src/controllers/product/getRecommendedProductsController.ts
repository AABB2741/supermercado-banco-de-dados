import { Request, Response } from "express";
import z from "zod";

import { getRecommendedProductsUseCase } from "../../useCases/product/getRecommendedProductsUseCase";

export async function getRecommendedProductsController(
	req: Request,
	res: Response
) {
	const search = z.string().optional().parse(req.params.search);

	const publicProducts = await getRecommendedProductsUseCase(search);
	res.json({
		public: publicProducts,
		suggested: [],
	});
}
