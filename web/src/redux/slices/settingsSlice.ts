import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SettingsProps } from "../../@types/settings-props";

const defaultSettings: SettingsProps = {
    theme: "auto",
};

const initialState: { settings: SettingsProps } = {
    settings: {
        ...defaultSettings,
        ...JSON.parse(localStorage.getItem("settings") ?? "{}"),
    },
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Partial<SettingsProps>>) => {
            state.settings = { ...state.settings, ...action.payload };
            localStorage.setItem("settings", JSON.stringify(state.settings));
        },
    },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
