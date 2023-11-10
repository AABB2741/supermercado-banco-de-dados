import { SHA256 } from "crypto-js";

import { prisma } from "./prisma";

import { defaultProducts } from "./data/defaultProducts";

/** Esta função deve ser executada toda vez que o banco de dados for zerado. Ele contém algumas informações padrões necessárias, como o usuário RPB Shopping e produtos para listas de compras */
export async function setup() {
	console.log(`Iniciando dados padrão para o banco de dados...`);
	// Criação de usuário padrão
	const defaultUser = {
		name: "RPB Shopping",
		email: "default@rpbshopping.com",
		password: SHA256("rpb-shopping-default-user-password").toString(),
	};
	console.log("Criando o usuário...");

	const user = await prisma.user.create({
		data: defaultUser,
	});
	console.log(`Criado o usuário ${user.name} com id ${user.id}`);

	console.log("Adicionando produtos padrão...");
	// Inserção de produtos padrão
	const res = await prisma.$transaction(
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
	console.log(
		`${res.length} produtos foram adicionados ao banco de dados para o usuário padrão`
	);

	console.log("Finalizado a função de dados padrão.");
}
setup();
