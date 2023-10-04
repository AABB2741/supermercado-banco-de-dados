import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignUp() {
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
                />
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
                <Input
                    label="Confirmar senha"
                    placeholder="Insira sua senha novamente"
                    type="password"
                />
                <Button.Normal accent>Criar sua conta</Button.Normal>
                <Button.Link to="../">Já tenho uma conta</Button.Link>
            </form>
        </div>
    );
}
