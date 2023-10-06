import { SHA256 } from "crypto-js";

import { prisma } from "../../prisma";

interface SignUpProps {
	name: string;
	email: string;
	password: string;
}

export async function SignUpUseCase({ name, email, password }: SignUpProps) {
	const user = await prisma.user.create({
		data: {
			name,
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
