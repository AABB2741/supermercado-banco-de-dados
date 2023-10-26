import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

export async function getProductsUseCase(search: string = "") {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: normalize(search).toLowerCase(),
			},
		},
	});

	return {
		basic: products,
		suggested: products,
	};
}
