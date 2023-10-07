import { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";

import { LoginUseCase } from "../../useCases/auth/LoginUseCase";

export async function LoginController(req: Request, res: Response) {
	const bodySchema = z.object({
		email: z.string().email("invalid_email"),
		password: z.string(),
	});

	const credentials = bodySchema.parse(req.body);
	const user = await LoginUseCase(credentials);

	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 60 * 60 * 24 * 30,
		}
	);

	res.status(201).json({ ...user, token });
}
