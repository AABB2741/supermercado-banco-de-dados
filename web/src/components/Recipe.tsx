import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import listBanner from "../assets/list-banner.jpg";
import avatar from "../assets/avatar.png";

interface RecipeProps {
    id: number;
    name: string;
    description: string;
    thumbnail?: string;
    user: {
        id: number;
        name: string;
    };
    className?: string;
}

export function Recipe({
    id,
    name,
    description,
    user,
    className,
}: RecipeProps) {
    return (
        <Link
            className={twMerge(
                "relative min-h-[192px] min-w-[192px] overflow-hidden rounded-lg text-white shadow-lg",
                className,
            )}
            to={"/recipe/" + id}
        >
            <img
                src={listBanner}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 px-4 py-2">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                    {name}
                </p>
                <p className="my-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                    {description}
                </p>
                <div className="flex items-center gap-2">
                    <img src={avatar} className="h-5 w-5 rounded-full" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                        {user.name}
                    </span>
                </div>
            </div>
        </Link>
    );
}
