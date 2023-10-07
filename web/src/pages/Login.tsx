import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import z from "zod";

import { setUser } from "../redux/slices/userSlice";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { signIn } from "../services/auth/signIn";

import { ErrorCode } from "../errors/AppError";

export function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const dispatch = useDispatch();

    async function handleLogin() {
        setError(undefined);
        setLoading(true);

        const email = z
            .string()
            .email()
            .parse(emailRef.current?.value);
        const password = z.string().parse(passwordRef.current?.value);

        try {
            const user = await signIn({
                email,
                password,
            });

            dispatch(setUser(user));
        } catch (err) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Fazer login</h1>
            <p className="mt-2 text-lg">
                Faça login para sincronizar suas listas de compras e aproveitar
                ao máximo a RPB Shopping!
            </p>
            <form className="flex flex-col gap-4 py-4">
                <Input
                    label="Endereço de e-mail"
                    placeholder="seuemail@exemplo.com"
                    type="email"
                    ref={emailRef}
                    nextFocus={passwordRef}
                />
                <Input
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                    ref={passwordRef}
                    nextFocus={submitRef}
                />
                {error && <p className="my-2 text-sm text-red-400">{error}</p>}
                <Button.Normal
                    accent
                    loading={loading}
                    ref={submitRef}
                    onClick={handleLogin}
                >
                    Fazer login
                </Button.Normal>
                <Button.Link to="./signup">
                    Ainda não tenho uma conta
                </Button.Link>
            </form>
        </div>
    );
}
