import { createBrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { DashboardRoutes } from "./dashboard.routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

import { Dashboard } from "../pages/Dashboard";
import { Lists } from "../pages/Dashboard/Lists";
import { Inventory } from "../pages/Dashboard/Inventory";

import { List } from "../pages/List";

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
                path: "/auth/",
                element: <Login />,
            },
            {
                path: "/auth/signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardRoutes />,
        children: [
            {
                path: "/dashboard/",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/lists",
                element: <Lists />,
            },
            {
                path: "/dashboard/inventory",
                element: <Inventory />,
            },
        ],
    },
    {
        path: "/list/:id",
        element: <List />,
    },
]);
