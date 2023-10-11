import { Check, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

import { useList } from "../../contexts/ListProvider";

import listBanner from "../../assets/list-banner.jpg";
import avatar from "../../assets/avatar.png";

export function Banner() {
    const { list } = useList();

    if (!list) return null;

    return (
        <div
            className="flex min-h-[400px] flex-col justify-between bg-cover text-white"
            style={{ backgroundImage: `url(${listBanner})` }}
        >
            {/* Top */}
            <div className="flex p-10">
                <Link to="/dashboard/" className="rounded-lg bg-black/50 p-3">
                    <ArrowLeft size={20} />
                </Link>
            </div>

            {/* Bottom */}
            <div className="flex justify-between bg-gradient-to-t from-black to-transparent p-10">
                {/* Left */}
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/50 px-6 py-2 text-yellow-400">
                        <Clock color="currentColor" size={20} />
                        <span className="text-lg font-bold">
                            Vence em 28/01/2005
                        </span>
                    </div>
                    {/* <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-black/50 px-6 py-2 text-green-400">
                        <Check color="currentColor" size={20} />
                        <span className="text-lg font-bold">Concluída</span>
                    </div> */}
                    <h1 className="mt-4 line-clamp-2 break-words font-featured text-6xl font-bold">
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
                            <span className="text-lg">por Lule</span>
                        </div>

                        {/* List data */}
                        <span className="text-xl text-green-400">R$890,33</span>
                        <span className="text-xl text-yellow-400">
                            14/38 itens
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-8 self-end">
                    <button>
                        <Settings size={32} />
                    </button>
                    <button className="aspect-square rounded-full bg-sky-500 p-4 text-white">
                        <Check />
                    </button>
                </div>
            </div>
        </div>
    );
}
