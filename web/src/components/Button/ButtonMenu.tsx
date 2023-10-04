import { Link, To, useLocation } from "react-router-dom";

interface ButtonMenuProps {
    icon: React.ElementType;
    label: string;
    to: To;
    selected?: boolean;
}

export function ButtonMenu({ icon: Icon, label, to }: ButtonMenuProps) {
    const { pathname } = useLocation();

    return (
        <Link
            className="flex select-none items-center gap-2 rounded-lg px-4 py-2 font-medium hover:bg-gray-200 data-[selected=true]:pointer-events-none data-[selected=true]:font-bold"
            to={to}
            data-selected={pathname === to}
        >
            <Icon size={18} className="text-gray-700" />
            <p>{label}</p>
        </Link>
    );
}
