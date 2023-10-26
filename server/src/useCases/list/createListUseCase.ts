import { List } from "@prisma/client";

import { prisma } from "../../prisma";

type CreateListProps = Omit<
	List,
	"id" | "due" | "createdAt" | "checkedAt" | "checked"
>;

export async function createListUseCase(data: CreateListProps) {
	const list = await prisma.list.create({
		data,
		select: {
			id: true,
		},
	});
	return list;
}
