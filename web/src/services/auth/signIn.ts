import Cookies from "js-cookie";
import z from "zod";

import { api } from "../../api/api";

import { UserProps } from "../../@types/user-props";

export interface SignInProps {
    email: string;
    password: string;
}

export async function signIn(props: SignInProps) {
    const schema = z.object({
        email: z.string().email("Endereço de e-mail inválido."),
        password: z.string(),
    });

    const credentials = schema.parse(props);

    const { data } = await api.post<UserProps & { token: string }>(
        "/auth/login",
        credentials,
    );
    Cookies.set("token", data.token);
    return data;
}
