import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { SignUpUseCase } from "../../useCases/auth/SignUpUseCase";

export async function SignUpController(req: Request, res: Response) {
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
	const user = await SignUpUseCase(credentials);
	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 60 * 60 * 30, // 1 month
		}
	);

	res.status(201).json({ ...user, token });
}
