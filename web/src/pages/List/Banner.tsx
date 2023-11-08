import { useMemo } from "react";
import { Check, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

import { useList } from "../../contexts/ListProvider";

import listBanner from "../../assets/list-banner.jpg";
import avatar from "../../assets/avatar.png";

export function Banner() {
    const { list, toggle } = useList();

    const checkedCount = useMemo(
        () =>
            list.items?.reduce((prev, cur) => prev + (cur.checked ? 1 : 0), 0),
        [list],
    );

    if (!list || !list.items) return null;

    return (
        <div
            className="flex min-h-[400px] flex-col justify-between bg-cover text-white"
            style={{ backgroundImage: `url(${listBanner})` }}
        >
            {/* Top */}
            <div className="flex p-4 md:p-6 lg:p-10">
                <Link
                    to="/dashboard/lists"
                    className="rounded-lg bg-black/50 p-3"
                >
                    <ArrowLeft size={20} />
                </Link>
            </div>

            {/* Bottom */}
            <div className="flex flex-col justify-between gap-4 bg-gradient-to-t from-black to-transparent p-4 md:flex-row md:p-6 lg:p-10">
                {/* Left */}
                <div className="flex-1">
                    <div
                        className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/50 px-6 py-2 text-yellow-400 data-[checked=true]:hidden"
                        data-checked={list.checked}
                    >
                        <Clock color="currentColor" size={20} />
                        <span className="whitespace-nowrap text-sm font-bold md:text-lg">
                            Pendente
                        </span>
                    </div>
                    <div
                        className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/50 px-6 py-2 text-green-400 data-[checked=false]:hidden"
                        data-checked={list.checked}
                    >
                        <Check color="currentColor" size={20} />
                        <span className="whitespace-nowrap text-sm font-bold md:text-lg">
                            Concluída
                        </span>
                    </div>
                    <h1 className="mt-4 line-clamp-2 break-words font-featured text-3xl font-bold md:text-4xl lg:text-6xl">
                        {list.name}
                    </h1>

                    {/* List infos */}
                    <div className="mt-4 flex items-center justify-start gap-6 font-bold">
                        {/* User */}
                        <div className="flex items-center gap-4">
                            <img
                                src={avatar}
                                className="h-9 w-9 rounded-full"
                            />
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap md:text-lg">
                                por {list.user?.name ?? "Usuário desconhecido"}
                            </span>
                        </div>

                        {/* List data */}
                        <span className="hidden text-xl text-green-400 md:block">
                            R$
                            {list.items
                                .reduce(
                                    (acc, cur) =>
                                        acc +
                                        (cur.product.price ?? 0) * cur.amount,
                                    0,
                                )
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>
                        <span className="hidden text-xl text-yellow-400 md:block">
                            {checkedCount}/{list.items.length} itens
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex w-full items-center justify-between self-end md:w-auto">
                    <div className="flex flex-1 gap-4 md:hidden">
                        <span className="text-md font-bold text-green-400 md:block">
                            R$
                            {list.items
                                .reduce(
                                    (acc, cur) =>
                                        acc +
                                        (cur.product.price ?? 0) * cur.amount,
                                    0,
                                )
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>
                        <span className="text-md font-bold text-yellow-400 md:block">
                            {checkedCount}/{list.items.length} itens
                        </span>
                    </div>
                    <div className="flex items-center gap-8">
                        <button>
                            <Settings size={32} />
                            {/* 32px */}
                        </button>
                        <button
                            className="flex items-center gap-4 rounded-full p-4 text-white transition-all data-[expanded=true]:py-4"
                            style={{ backgroundColor: list.color }}
                            onClick={toggle}
                        >
                            {list.checked ? <X /> : <Check />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
