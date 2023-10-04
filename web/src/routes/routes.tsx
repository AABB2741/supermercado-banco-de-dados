import { createBrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/auth",
        element: <AuthRoutes />,
        children: [
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/signup",
                element: <SignUp />,
            },
        ],
    },
]);
