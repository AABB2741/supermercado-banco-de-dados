import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Login() {
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
                />
                <Input
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                />
                <Button.Normal accent>Fazer login</Button.Normal>
                <Button.Link to="./signup">
                    Ainda não tenho uma conta
                </Button.Link>
            </form>
        </div>
    );
}
