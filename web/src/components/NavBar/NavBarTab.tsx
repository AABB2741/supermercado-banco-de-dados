import { Link, LinkProps, useLocation } from "react-router-dom";
import { LucideProps } from "lucide-react";

interface NavBarTabProps extends LinkProps {
    label: string;
    icon: React.ElementType<LucideProps>;
}

export function NavBarTab({ label, icon: Icon, ...rest }: NavBarTabProps) {
    const { pathname } = useLocation();

    return (
        <Link
            {...rest}
            className="relative flex items-center justify-center gap-4 px-4 py-2 after:absolute after:top-full after:mt-1 after:rounded-full data-[selected=true]:pointer-events-none data-[selected=true]:font-bold data-[selected=true]:after:h-[5px] data-[selected=true]:after:w-1/2 data-[selected=true]:after:bg-sky-500"
            data-selected={pathname === rest.to}
        >
            <Icon
                className="data-[selected=true]:fill-current"
                data-selected={pathname === rest.to}
                fill={pathname === rest.to ? "fill" : "transparent"}
            />
            <p>{label}</p>
        </Link>
    );
}
