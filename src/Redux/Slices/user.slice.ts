import { createSlice } from "@reduxjs/toolkit";

/**USER DETAILS SLICE */
export const UserSlice = createSlice({
  name: "user",
  initialState: {
    walletAddress: "",
    walletType: "",
    userDetails: {},
    network: "matic",
  },

  reducers: {
    userDetails: (state, param) => {
      const { payload } = param;
      state.userDetails = payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setWalletType: (state, action) => {
      state.walletType = action.payload;
    },

    walletAddress: (state, param) => {
      const { payload } = param;
      state.walletAddress = payload;
    },

    walletType: (state, param) => {
      const { payload } = param;
      state.walletType = payload;
    },

    logoutUser: (state) => {
      state.walletAddress = "";
      state.walletType = "";
    },
  },
});

/**ACTIONS FOR SLICE*/
export const { userDetails, setWalletAddress, logoutUser, setWalletType,walletAddress,walletType } =
  UserSlice.actions;

