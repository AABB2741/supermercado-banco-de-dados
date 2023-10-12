import { Outlet } from "react-router-dom";

import authBackground from "../assets/auth-background.jpg";

export function AuthRoutes() {
    return (
        <div className="flex max-h-screen min-h-screen flex-1 flex-col items-center justify-between overflow-y-auto lg:h-screen lg:flex-row lg:overflow-y-hidden">
            <img
                src={authBackground}
                className="h-[50vh] w-full object-cover lg:h-full lg:w-1/2"
            />
            <div className="mx-auto max-w-[600px] flex-1 p-8 lg:max-h-full lg:overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
