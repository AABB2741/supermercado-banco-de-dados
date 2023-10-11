import { Outlet } from "react-router-dom";

import authBackground from "../assets/auth-background.jpg";

export function AuthRoutes() {
    return (
        <div className="flex max-h-screen min-h-screen flex-1 items-center justify-between overflow-y-hidden">
            <img
                src={authBackground}
                className="min-h-screen w-1/2 object-cover"
            />
            <div className="mx-auto max-h-screen max-w-[600px] flex-1 overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}
