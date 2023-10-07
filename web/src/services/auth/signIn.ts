import z from "zod";

import { api } from "../../api/api";

import { UserProps } from "../../redux/slices/userSlice";

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

    const response = await api.post<UserProps & { token: string }>(
        "/auth/login",
        credentials,
    );
    return response.data;
}
