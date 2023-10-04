import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

export function DashboardRoutes() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Menu />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
