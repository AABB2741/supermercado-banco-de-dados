import { LogOut, Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";

import { useAppSelector } from "../redux/store";
import { logOut } from "../redux/slices/userSlice";
import { setSettings } from "../redux/slices/settingsSlice";

import avatar from "../assets/avatar.png";

import { SettingsProps } from "../@types/settings-props";

export function Header() {
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut() {
        dispatch(logOut());
        navigate("/auth");
    }

    function handleChangeTheme(theme: SettingsProps["theme"]) {
        dispatch(setSettings({ theme }));
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
                        className="rounded-xl border border-gray-300 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
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
                        <div className="mt-4 flex items-center justify-between dark:text-gray-100">
                            <span className="font-bold">Tema</span>
                            <div className="flex items-center overflow-hidden rounded-lg bg-sky-200 dark:bg-sky-900">
                                <button
                                    className="bg-sky-400 p-2 px-3 dark:bg-transparent"
                                    onClick={() => handleChangeTheme("light")}
                                >
                                    <Sun
                                        size={16}
                                        className="fill-current dark:fill-none"
                                    />
                                </button>
                                <button
                                    className="p-2 px-3 dark:bg-sky-500"
                                    onClick={() => handleChangeTheme("dark")}
                                >
                                    <Moon
                                        size={16}
                                        className="fill-none dark:fill-current"
                                    />
                                </button>
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
