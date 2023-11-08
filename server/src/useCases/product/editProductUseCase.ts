import { prisma } from "../../prisma";

interface EditProductProps {
	userId: number;
	productId: number;
	data: {
		price?: number;
		brand?: string;
	};
}

export async function editProductUseCase({
	userId,
	productId,
	data,
}: EditProductProps) {
	const referencedProduct = await prisma.product.findFirstOrThrow({
		where: {
			id: productId,
		},
		select: {
			id: true,
			userId: true,
			name: true,
			brand: true,
			price: true,
		},
	});

	// Caso o usuário seja o dono do produto, apenas irá atualizá-lo
	if (referencedProduct.userId === userId) {
		const product = await prisma.product.update({
			where: {
				id: productId,
			},
			data,
		});
	} else {
		// Caso o usuário NÃO seja o dono do produto, será criado um novo com o mesmo nome e outros atributos
		const product = await prisma.product.create({
			data: {
				...referencedProduct,
				...data,
				userId,
				id: undefined, // remove o ID para gerar um novo
			},
		});

		return product;
	}
}
