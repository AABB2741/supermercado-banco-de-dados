import { Outlet } from "react-router-dom";

import authBackground from "../assets/auth-background.jpg";

export function AuthRoutes() {
    return (
        <div className="flex min-h-screen items-center justify-between">
            <img
                src={authBackground}
                className="min-h-screen w-1/2 object-cover"
            />
            <div className="mx-auto max-w-[600px] flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}
