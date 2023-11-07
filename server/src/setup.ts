import { SHA256 } from "crypto-js";

import { prisma } from "./prisma";

import { defaultProducts } from "./data/defaultProducts";

/** Esta função deve ser executada toda vez que o banco de dados for zerado. Ele contém algumas informações padrões necessárias, como o usuário RPB Shopping e produtos para listas de compras */
export async function setup() {
	// Criação de usuário padrão
	const defaultUser = {
		name: "RPB Shopping",
		email: "default@rpbshopping.com",
		password: SHA256("rpb-shopping-default-user-password").toString(),
	};

	const user = await prisma.user.create({
		data: defaultUser,
	});

	// Inserção de produtos padrão
	await prisma.$transaction(
		defaultProducts.map((p) =>
			prisma.product.create({
				data: {
					name: p,
					userId: user.id,
					public: true,
				},
			})
		)
	);
}
setup();
