import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { router } from "./routes/routes";
import { store } from "./redux/store";

export function App() {
    return (
        <main className="min-h-screen bg-gray-200 dark:bg-zinc-800 dark:text-gray-100">
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </main>
    );
}
