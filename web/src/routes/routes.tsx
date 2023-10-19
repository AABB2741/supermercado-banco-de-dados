import { createBrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { DashboardRoutes } from "./dashboard.routes";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

import { Dashboard } from "../pages/Dashboard";
import { ListsProvider } from "../contexts/ListsProvider";
import { Lists } from "../pages/Dashboard/Lists";

import { ListProvider } from "../contexts/ListProvider";
import { List } from "../pages/List";

import { Pantry } from "../pages/Pantry";

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
                element: (
                    <ListsProvider>
                        <Lists />
                    </ListsProvider>
                ),
            },
            {
                path: "/dashboard/pantry",
                element: <Pantry />,
            },
        ],
    },
    {
        path: "/list/:id",
        element: (
            <ListProvider>
                <List />
            </ListProvider>
        ),
    },
]);
