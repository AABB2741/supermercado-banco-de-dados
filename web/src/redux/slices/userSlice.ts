import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: number;
    name: string;
    email: string;
};

const initialState: User | Partial<User> = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
