import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import z, { ZodError } from "zod";

import { setUser } from "../redux/slices/userSlice";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { signIn } from "../services/auth/signIn";

import { ErrorCode } from "../errors/AppError";

export function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorCode>();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogin() {
        setError(undefined);
        setLoading(true);

        try {
            const email = z
                .string()
                .email()
                .parse(emailRef.current?.value);
            const password = z.string().parse(passwordRef.current?.value);

            const user = await signIn({
                email,
                password,
            });
            console.log(user);
            dispatch(setUser(user));
            navigate("/dashboard/");
        } catch (err) {
            if (err instanceof AxiosError) {
                return setError("invalid_username_or_password");
            }

            if (err instanceof ZodError) {
                return setError("unknown_error");
            }

            setError("unknown_error");
            passwordRef.current?.focus();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        document.title = "Login - RPB Shopping";
    }, []);

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
                {error && (
                    <p className="my-2 text-center text-sm text-red-400">
                        {error}
                    </p>
                )}
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
