import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
