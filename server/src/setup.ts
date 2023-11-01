import { SHA256 } from "crypto-js";

import { prisma } from "./prisma";

import { defaultProducts } from "./data/defaultProducts";

/** Esta função deve ser executada toda vez que o banco de dados for zerado. Ele contém algumas informações padrões necessárias, como o usuário RPB Shopping e produtos para listas de compras */
export async function setup() {
	const user = {
		name: "RPB Shopping",
		email: "default@rpbshopping.com",
		password: SHA256("rpb-shopping-default-user-password").toString(),
	};

	await prisma.user.create({
		data: user,
	});

	await prisma.$transaction(
		defaultProducts.map((p) =>
			prisma.product.create({
				data: {
					name: p,
					userId: 1,
					public: true,
				},
			})
		)
	);
}
setup();
