import { PackageOpen, Sparkles, ListTodo } from "lucide-react";

import { NavBarTab } from "./NavBarTab";

export function NavBar() {
    return (
        <div className="flex items-center justify-center gap-4">
            <NavBarTab label="Para você" to="/dashboard/" icon={Sparkles} />
            <NavBarTab
                label="Minhas listas"
                to="/dashboard/lists"
                icon={ListTodo}
            />
            <NavBarTab
                label="Meu inventário"
                to="/dashboard/inventory"
                icon={PackageOpen}
            />
        </div>
    );
}
