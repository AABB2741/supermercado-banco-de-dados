import { SHA256 } from "crypto-js";

import { prisma } from "./prisma";

import { defaultProducts } from "./data/defaultProducts";

/** Esta função deve ser executada toda vez que o banco de dados for zerado. Ele contém algumas informações padrões necessárias, como o usuário RPB Shopping e produtos para listas de compras */
export async function setup() {
	const startTime = new Date().getTime();
	console.log(`Iniciando dados padrão para o banco de dados...`);
	// Criação de usuário padrão
	const defaultUser = {
		name: "RPB Shopping",
		email: "shopping@rpbcompany.com.br",
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

	const endTime = new Date().getTime();
	console.log(
		`População de banco de dados finalizada em ${endTime - startTime}ms`
	);
}
setup();
