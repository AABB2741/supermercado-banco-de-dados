import { prisma } from "../../prisma";

export async function getProductUseCase(id: number) {
	const product = await prisma.product.findUniqueOrThrow({
		where: {
			id,
		},
	});

	return product;
}
