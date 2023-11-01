import { Sparkles, ListTodo, Package } from "lucide-react";

import { NavBarTab } from "./NavBarTab";

export function NavBar() {
    return (
        <div className="mt-4 flex items-center justify-center gap-4">
            <NavBarTab label="Para você" to="/dashboard" icon={Sparkles} />
            <NavBarTab
                label="Minhas listas"
                to="/dashboard/lists"
                icon={ListTodo}
            />
            <NavBarTab
                label="Minha despensa"
                to="/dashboard/pantry"
                icon={Package}
            />
        </div>
    );
}
