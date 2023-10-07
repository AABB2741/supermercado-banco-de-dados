import { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";

export async function LoginController(req: Request, res: Response) {
	const bodySchema = z.object({
		email: z.string().email("invalid_email"),
		password: z.string(),
	});

	const credentials = bodySchema.parse(req.body);
}
