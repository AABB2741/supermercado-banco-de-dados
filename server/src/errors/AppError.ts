export type ErrorCode =
	| "invalid_username"
	| "username_too_short"
	| "username_too_long"
	| "invalid_email"
	| "invalid_password"
	| "password_too_short"
	| "password_too_long"
	| "passwords_not_match"
	| "unauthorized";

export class AppError {
	status: number;
	code: ErrorCode;

	constructor(code: ErrorCode, status = 500) {
		this.code = code;
		this.status = status;
	}
}
