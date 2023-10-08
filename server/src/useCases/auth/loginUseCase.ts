import { SHA256 } from "crypto-js";

import { prisma } from "../../prisma";

interface LoginProps {
	email: string;
	password: string;
}

export async function loginUseCase({ email, password }: LoginProps) {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email,
			password: SHA256(password).toString(),
		},
		select: {
			id: true,
			name: true,
			email: true,
		},
	});

	return user;
}
