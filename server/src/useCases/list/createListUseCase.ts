import { prisma } from "../../prisma";

interface CreateListProps {
	userId: number;
	name: string;
	color: string;
}

export async function createListUseCase(data: CreateListProps) {
	const list = await prisma.list.create({
		data,
		select: {
			id: true,
		},
	});
	return list;
}
