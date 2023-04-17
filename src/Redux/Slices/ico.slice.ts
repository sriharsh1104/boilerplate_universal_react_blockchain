import { createSlice } from "@reduxjs/toolkit";

/**ICO SLICE */
export const IcoSlice = createSlice({
    name: 'ico',
    initialState: {
        bnbDecimals: "18",
        usdtDecimals: "",
    },

    reducers: {
        bnbDecimals: (state, param) => {
            const { payload } = param;
            state.bnbDecimals = payload;
        },

        usdtDecimals: (state, param) => {
            const { payload } = param;
            state.usdtDecimals = payload;
        },
    }
})


// ACTIONS FOR SLICE
export const { bnbDecimals, usdtDecimals } = IcoSlice.actions;

