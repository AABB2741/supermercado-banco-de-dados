import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { signUpUseCase } from "../../useCases/auth/signUpUseCase";

export async function signUpController(req: Request, res: Response) {
	console.log("Criando novo usuário");
	const bodySchema = z.object({
		name: z
			.string()
			.min(3, "username_too_short")
			.max(100, "username_too_long"),
		email: z.string().email("invalid_email"),
		password: z
			.string()
			.min(4, "password_too_short")
			.max(50, "password_too_long"),
	});

	const credentials = bodySchema.parse(req.body);
	const user = await signUpUseCase(credentials);
	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 60 * 60 * 24 * 30, // 1 month
		}
	);

	res.status(201).json({ ...user, token });
}
