import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserProps = {
    id: number;
    name: string;
    email: string;
};

const initialState: UserProps | Partial<UserProps> = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProps>) => {
            state = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
