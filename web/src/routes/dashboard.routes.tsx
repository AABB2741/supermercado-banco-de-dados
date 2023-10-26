import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";

export function DashboardRoutes() {
    return (
        <div className="min-h-screen">
            <Header />
            <NavBar />
            <div className="mt-8">
                <Outlet />
            </div>
        </div>
    );
}
