import avatar from "../assets/avatar.png";

export function Header() {
    return (
        <header className="flex items-center justify-between p-4">
            <h1 className="font-bold">Bom dia, Nome do usuário! 👋</h1>
            <button className="flex items-center justify-center gap-4">
                <span>Nome do usuário</span>
                <img src={avatar} className="h-[30px] w-[30px]" />
            </button>
        </header>
    );
}
