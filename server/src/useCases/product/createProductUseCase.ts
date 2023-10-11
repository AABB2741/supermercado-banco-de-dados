import { prisma } from "../../prisma";

interface CreateProductProps {
	userId: number;
	name: string;
	price?: number;
	dueTime?: number;
	brandId?: number;
}

export async function createProductUseCase(data: CreateProductProps) {
	const product = await prisma.product.create({
		data,
	});

	return product;
}
