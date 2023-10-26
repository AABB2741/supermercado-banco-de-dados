import { Product } from "@prisma/client";

import { prisma } from "../../prisma";

type CreateProductProps = {
	userId: number;
	name: string;
	price?: number;
	dueTime?: number;
	brand?: string;
};

export async function createProductUseCase(data: CreateProductProps) {
	const product = await prisma.product.create({
		data,
	});

	return product;
}
