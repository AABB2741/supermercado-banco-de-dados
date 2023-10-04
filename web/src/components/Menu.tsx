import { ListTodo, PackageOpen } from "lucide-react";

import { Button } from "./Button";

export function Menu() {
    return (
        <aside className="rounded-xl bg-gray-100 p-8">
            <nav>
                <ul>
                    <li>
                        <Button.Menu
                            icon={ListTodo}
                            label="Minhas listas"
                            to="/dashboard/lists"
                        />
                    </li>
                    <li>
                        <Button.Menu
                            icon={PackageOpen}
                            label="Meu inventário"
                            to="/dashboard/inventory"
                        />
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
