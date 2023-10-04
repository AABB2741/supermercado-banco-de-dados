import "./styles/global.css";

import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes";

export function App() {
    return (
        <main className="min-h-screen bg-gray-200">
            <RouterProvider router={router} />
        </main>
    );
}
