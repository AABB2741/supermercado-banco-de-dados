import { SHA256 } from "crypto-js";

import { prisma } from "../../prisma";

interface LoginProps {
	email: string;
	password: string;
}

export async function LoginUseCase({ email, password }: LoginProps) {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email,
			password: SHA256(password).toString(),
		},
	});
}
