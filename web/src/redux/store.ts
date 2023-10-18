import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import userSlice from "./slices/userSlice";
import settingsSlice from "./slices/settingsSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        settings: settingsSlice,
    },
});

export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
