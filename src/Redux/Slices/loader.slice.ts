import { createSlice } from "@reduxjs/toolkit";

/**LOADER SLICE */
export const LoaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false,
    },

    reducers: {
        loader: (state, param) => {
            const { payload } = param;
            state.isLoading = payload;
        }
    }
})

/**ACTION FOR SLICE*/
export const { loader } = LoaderSlice.actions

