import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import z, { ZodError } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { signUp } from "../services/auth/signUp";
import { setUser } from "../redux/slices/userSlice";

import { AppError } from "../errors/AppError";
import { wait } from "../utils/wait";

export function SignUp() {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSignUp() {
        setError(undefined);
        setLoading(true);

        try {
            const name = z
                .string({
                    invalid_type_error: "unknown_error",
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

            await wait(3000);
            const user = await signUp({ email, name, password });
            dispatch(setUser(user));
            navigate("/dashboard/");
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
                    ref={nameRef}
                />
                <Input
                    label="Endereço de e-mail"
                    placeholder="seuemail@exemplo.com"
                    type="email"
                    nextFocus={passwordRef}
                    ref={emailRef}
                />
                <Input
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                    nextFocus={passwordConfirmRef}
                    ref={passwordRef}
                />
                <Input
                    label="Confirmar senha"
                    placeholder="Insira sua senha novamente"
                    type="password"
                    nextFocus={submitRef}
                    ref={passwordConfirmRef}
                />
                {error && <p className="my-2 text-sm text-red-400">{error}</p>}
                <Button.Normal
                    accent
                    loading={loading}
                    ref={submitRef}
                    onClick={handleSignUp}
                >
                    Criar sua conta
                </Button.Normal>
                <Button.Link to="../">Já tenho uma conta</Button.Link>
            </form>
        </div>
    );
}
