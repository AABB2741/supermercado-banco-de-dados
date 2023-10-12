import { Outlet } from "react-router-dom";

import authBackground from "../assets/auth-background.jpg";

export function AuthRoutes() {
    return (
        <div className="flex max-h-screen min-h-screen flex-1 flex-col items-center justify-between overflow-y-auto lg:flex-row">
            <img
                src={authBackground}
                className="h-[50vh] w-full object-cover"
            />
            <div className="mx-auto max-w-[600px] flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}
