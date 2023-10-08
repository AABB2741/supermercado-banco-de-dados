import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserProps = {
    id: number;
    name: string;
    email: string;
};

const initialState: { user: UserProps | null } = {
    user: JSON.parse(localStorage.getItem("user") ?? "null"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
