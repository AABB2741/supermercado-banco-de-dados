import { useRef, useState } from "react";

import z, { ZodError } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { AppError } from "../errors/AppError";

export function SignUp() {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    async function handleSignUp() {
        setError(undefined);
        setLoading(true);

        try {
            const name = z
                .string({
                    invalid_type_error: "invalid_username",
                    required_error: "invalid_username",
                })
                .parse(nameRef.current?.value?.trim());
            const email = z.string().parse(emailRef.current?.value);
            const password = z.string().parse(passwordRef.current?.value);
            const passwordConfirm = z
                .string()
                .parse(passwordConfirmRef.current?.value);

            if (password !== passwordConfirm)
                throw new AppError("passwords_not_match");
        } catch (err) {
            // TODO: handle error

            if (err instanceof ZodError) {
                console.log(err);
                return setError(err.message);
            }

            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Criar conta</h1>
            <p className="mt-2 text-lg">
                Crie sua conta grátis agora e facilite sua vida na hora de
                comprar.
            </p>
            <form className="flex flex-col gap-4 py-4">
                <Input
                    label="Nome de usuário"
                    placeholder="Digite qualquer nome"
                    type="email"
                    nextFocus={emailRef}
                />
                <Input
                    label="Endereço de e-mail"
                    placeholder="seuemail@exemplo.com"
                    type="email"
                    nextFocus={passwordRef}
                />
                <Input
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                    nextFocus={passwordConfirmRef}
                />
                <Input
                    label="Confirmar senha"
                    placeholder="Insira sua senha novamente"
                    type="password"
                    nextFocus={submitRef}
                />
                {error && <p className="my-2 text-sm text-red-400">{error}</p>}
                <Button.Normal accent ref={submitRef} onClick={handleSignUp}>
                    Criar sua conta
                </Button.Normal>
                <Button.Link to="../">Já tenho uma conta</Button.Link>
            </form>
        </div>
    );
}
