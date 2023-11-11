import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { UserProps } from "../../@types/user-props";

const initialState: { user: UserProps | null } = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            Cookies.remove("token");
            state.user = null;
        },
    },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
