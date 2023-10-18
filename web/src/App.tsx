import "./styles/global.css";

import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes";
import { useAppSelector } from "./redux/store";

export function App() {
    const {
        settings: { theme },
    } = useAppSelector((state) => state.settings);

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-zinc-800 dark:text-gray-100">
            <RouterProvider router={router} />
        </main>
    );
}
