import { createBrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { DashboardRoutes } from "./dashboard.routes";

import { Footer } from "../components/Footer";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

import { Recipes } from "../pages/Recipes";
import { ListsProvider } from "../contexts/ListsProvider";
import { Lists } from "../pages/Dashboard/Lists";

import { ListProvider } from "../contexts/ListProvider";
import { List } from "../pages/List";

import { Pantry } from "../pages/Dashboard/Pantry";

import { RecipeProvider } from "../contexts/RecipeProvider";
import { Recipe } from "../pages/Recipe";

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
        element: (
            <>
                <DashboardRoutes />
                <Footer />
            </>
        ),
        children: [
            {
                path: "/dashboard/",
                element: <Recipes />,
            },
            {
                path: "/dashboard/recipes",
                element: <Recipes />,
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
                <Footer />
            </ListProvider>
        ),
    },
    {
        path: "/recipe/:id",
        element: (
            <RecipeProvider>
                <Recipe />
            </RecipeProvider>
        ),
    },
]);
