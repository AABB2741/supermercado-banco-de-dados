import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { SignUpUseCase } from "../../useCases/auth/SignUpUseCase";

export async function SignUpController(req: Request, res: Response) {
	const bodySchema = z.object({
		name: z.string().min(3).max(100),
		email: z.string().email(),
		password: z.string().min(4).max(50),
	});

	const credentials = bodySchema.parse(req.body);
	const user = await SignUpUseCase(credentials);
	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET as string
	);

	res.status(201).json({ ...user, token });
}
