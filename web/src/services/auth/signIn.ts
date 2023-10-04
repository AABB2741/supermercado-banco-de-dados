import z from "zod";

export interface SignInProps {
    email: string;
    password: string;
}

export async function signIn(props: SignInProps) {
    const schema = z.object({
        email: z.string().email("Endereço de e-mail inválido."),
        password: z.string(),
    });

    const { email, password } = schema.parse(props);
}
