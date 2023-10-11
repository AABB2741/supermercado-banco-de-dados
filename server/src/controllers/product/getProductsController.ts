import { Request, Response } from "express";
import z from "zod";
import { getProductsUseCase } from "../../useCases/product/getProductsUseCase";

export async function getProductsController(req: Request, res: Response) {
	const search = z.string().parse(req.params.search);

	const products = await getProductsUseCase(search);
	res.json(products);
}
