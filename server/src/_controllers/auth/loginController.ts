import { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";

import { loginUseCase } from "../../useCases/auth/loginUseCase";

export async function loginController(req: Request, res: Response) {
	const bodySchema = z.object({
		email: z.string().email("invalid_email"),
		password: z.string(),
	});

	const credentials = bodySchema.parse(req.body);
	const user = await loginUseCase(credentials);

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
