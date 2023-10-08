import { prisma } from "../../prisma";

interface CreateListProps {
	userId: number;
	name: string;
	color: string;
}

export async function CreateListUseCase(data: CreateListProps) {
	const list = await prisma.list.create({
		data,
	});
	return list;
}
