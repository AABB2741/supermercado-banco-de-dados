type ErrorCode =
    | "invalid_username"
    | "username_too_short"
    | "username_too_long"
    | "invalid_email"
    | "invalid_password"
    | "password_too_short"
    | "password_too_long"
    | "passwords_not_match";

export class AppError {
    code: ErrorCode;

    constructor(code: ErrorCode) {
        this.code = code;
    }
}
