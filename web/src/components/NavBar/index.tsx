import { ListTodo, Package, ChefHat } from "lucide-react";

import { NavBarTab } from "./NavBarTab";

export function NavBar() {
    return (
        <div className="no-scrollbar mt-4 flex items-center justify-center justify-center gap-4 overflow-x-auto px-4 text-sm">
            <NavBarTab label="Receitas" to="/dashboard" icon={ChefHat} />
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
