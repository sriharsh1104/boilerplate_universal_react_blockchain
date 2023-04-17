import { createSlice } from "@reduxjs/toolkit";

const initialState: { theme: "light" | "dark" } = {
    theme: "light",
}

export const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, { payload }) => {
            state.theme = payload;
        }
    }
})

export const { changeTheme } = ThemeSlice.actions;