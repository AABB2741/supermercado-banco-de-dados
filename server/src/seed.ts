import { SHA256 } from "crypto-js";

import { prisma } from "./prisma";

import { defaultProducts } from "./data/defaultProducts";
import * as defaultRecipes from "./data/defaultRecipes";

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
	console.log("\nCriando o usuário...");

	const userStartTime = new Date().getTime();
	const user = await prisma.user.create({
		data: defaultUser,
		select: {
			id: true,
			name: true,
		},
	});
	console.log(
		`Criado o usuário ${user.name} com id ${user.id}\nTempo: ${
			new Date().getTime() - userStartTime
		}ms`
	);

	console.log("\nAdicionando produtos padrão...");
	// Inserção de produtos padrão
	const productsStartTime = new Date().getTime();
	const res = await prisma.$transaction(
		defaultProducts.map((p) =>
			prisma.product.create({
				data: {
					name: p,
					userId: user.id,
					public: true,
				},
				select: {
					id: true,
				},
			})
		)
	);
	console.log(
		`${
			res.length
		} produtos foram adicionados ao banco de dados para o usuário padrão.\nTempo: ${
			new Date().getTime() - productsStartTime
		}ms`
	);

	console.log("\nCriando receitas padrão...");
	const recipesStartTime = new Date().getTime();
	const recipes = await prisma.$transaction(
		defaultRecipes.recipes.map((recipe) =>
			prisma.recipe.create({
				data: recipe,
				select: {
					id: true,
				},
			})
		)
	);
	console.log(
		`Criada(s) ${
			recipes.length
		} receita(s) para o usuário com ID 1.\nTempo: ${
			new Date().getTime() - recipesStartTime
		}ms`
	);

	console.log("\nAdicionando ingredientes às receitas...");
	const ingredientsStartTime = new Date().getTime();
	const ingredients = await prisma.$transaction(
		defaultRecipes.ingredients.map((ingredient) =>
			prisma.ingredient.create({
				data: ingredient,
				select: {
					id: true,
				},
			})
		)
	);
	console.log(
		`Adicionados ${
			ingredients.length
		} ingredientes para todas as receitas.\nTempo: ${
			new Date().getTime() - ingredientsStartTime
		}ms`
	);

	console.log("\nAdicionando passo a passo para as receitas...");
	const preparationStartTime = new Date().getTime();
	const preparation = await prisma.$transaction(
		defaultRecipes.preparation.map((preparation) =>
			prisma.preparation.create({
				data: preparation,
				select: {
					id: true,
				},
			})
		)
	);
	console.log(
		`Adicionados ${
			preparation.length
		} instruções de preparo para as receitas.\nTempo: ${
			new Date().getTime() - preparationStartTime
		}ms`
	);

	const endTime = new Date().getTime();
	console.log(
		`\nPopulação de banco de dados finalizada em ${endTime - startTime}ms`
	);
}
setup();
