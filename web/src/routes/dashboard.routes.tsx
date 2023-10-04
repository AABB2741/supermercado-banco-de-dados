import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";

export function DashboardRoutes() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
