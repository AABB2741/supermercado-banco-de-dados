import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";

import { useAppSelector } from "../redux/store";
import { logOut } from "../redux/slices/userSlice";

import avatar from "../assets/avatar.png";

export function Header() {
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        dispatch(logOut());
        navigate("/auth");
    }

    return (
        <header className="flex items-center justify-between p-4">
            <p className="text-lg font-bold">
                {user?.name
                    ? `Boas vindas, ${user.name}! 👋`
                    : "Boas vindas! 👋"}
            </p>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="flex items-center justify-center gap-4">
                        <div className="text-right leading-none">
                            <p className="font-bold">{user?.name}</p>
                            <p className="text-xs">{user?.email}</p>
                        </div>
                        <img src={avatar} className="h-[30px] w-[30px]" />
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        align="end"
                        side="bottom"
                        sideOffset={12}
                        className="rounded-lg border p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                    >
                        <div className="flex items-center gap-2 dark:text-gray-100">
                            <img src={avatar} className="h-10 w-10" />
                            <div>
                                <p className="font-bold">{user?.name}</p>
                                <p className="max-h-[--radix-popover-content-available-height] max-w-[--radix-popover-content-available-width] text-sm text-gray-600 dark:text-zinc-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-4 flex w-full items-center justify-center gap-3 rounded-md py-1 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={handleLogOut}
                        >
                            <LogOut size={14} />
                            <span className="text-sm">Sair</span>
                        </button>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </header>
    );
}
