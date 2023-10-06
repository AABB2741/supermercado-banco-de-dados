import "./styles/global.css";

import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";

import { router } from "./routes/routes";

export function App() {
    return (
        <main className="min-h-screen bg-gray-200 dark:bg-zinc-800 dark:text-gray-100">
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </main>
    );
}
