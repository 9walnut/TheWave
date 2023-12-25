import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isAdmin: "N",
    accessToken: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        isAdmin: action.payload.isAdmin,
        accessToken: action.payload.accessToken,
      };
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
