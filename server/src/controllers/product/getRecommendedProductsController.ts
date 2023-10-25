import { Request, Response } from "express";
import z from "zod";

import { getRecommendedProductsUseCase } from "../../useCases/product/getRecommendedProductsUseCase";

export async function getRecommendedProductsController(
	req: Request,
	res: Response
) {
	const publicProducts = await getRecommendedProductsUseCase();
	res.json({
		public: publicProducts,
		suggested: [],
	});
}
