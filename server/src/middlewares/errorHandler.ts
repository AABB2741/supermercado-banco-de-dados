import { NextFunction, Request, Response } from "express";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { AppError } from "../errors/AppError";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(err);

	if (err instanceof AppError) {
		return res.status(err.status).json({
			code: err.code,
			status: err.status,
		});
	}

	if (err instanceof PrismaClientKnownRequestError) {
		switch (err.code) {
			case "P2025":
				res.status(404).send();
			default:
				res.status(500).send();
		}
	}

	res.status(500).send();
}
