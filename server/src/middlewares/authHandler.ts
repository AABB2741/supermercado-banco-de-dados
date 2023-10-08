import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

export function authHandler(req: Request, res: Response, next: NextFunction) {
	const headerSchema = z.object({
		authorization: z.string(),
	});

	const { authorization } = headerSchema.parse(req.headers);

	const token = jwt.verify(
		authorization,
		process.env.JWT_SECRET as string
	) as jwt.JwtPayload;

	req.userId = z.number().parse(token.id);

	next();
}
