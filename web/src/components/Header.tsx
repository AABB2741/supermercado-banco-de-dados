import avatar from "../assets/avatar.png";

export function Header() {
    return (
        <header className="flex items-center justify-between p-4">
            <h1 className="font-bold">Bom dia, Nome do usuário! 👋</h1>
            <button className="flex items-center justify-center gap-4">
                <div className="text-right leading-none">
                    <p className="font-bold">Nome do usuário</p>
                    <p className="text-xs">usuario@gmail.com</p>
                </div>
                <img src={avatar} className="h-[30px] w-[30px]" />
            </button>
        </header>
    );
}
