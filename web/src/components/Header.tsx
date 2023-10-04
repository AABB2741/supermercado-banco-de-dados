import avatar from "../assets/avatar.png";

import { useAuth } from "../contexts/auth";

export function Header() {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between p-4">
            <p className="text-lg font-bold">
                {user?.name
                    ? `Boas vindas, ${user.name}! 👋`
                    : "Boas vindas! 👋"}
            </p>
            <button className="flex items-center justify-center gap-4">
                <div className="text-right leading-none">
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-xs">{user?.email}</p>
                </div>
                <img src={avatar} className="h-[30px] w-[30px]" />
            </button>
        </header>
    );
}
