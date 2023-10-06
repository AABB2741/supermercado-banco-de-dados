import z from "zod";
import Cookies from "js-cookie";

import { api } from "../../api/api";

import { UserProps } from "../../redux/slices/userSlice";

interface SignUpProps {
    name: string;
    email: string;
    password: string;
}

export async function signUp(props: SignUpProps) {
    const schema = z.object({
        name: z
            .string({
                invalid_type_error: "invalid_username",
                required_error: "invalid_username",
            })
            .min(3, "username_too_short")
            .max(100, "username_too_long"),
        email: z.string().email("invalid_email"),
        password: z
            .string()
            .min(4, "password_too_short")
            .max(50, "password_too_long"),
    });

    const credentials = schema.parse(props);

    const { data } = await api.post<UserProps & { token: string }>(
        "/auth/signup",
        credentials,
    );
    Cookies.set("token", data.token);
    return data;
}
