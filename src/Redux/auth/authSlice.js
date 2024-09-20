import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setUsername: (state, action) => {
      state.username = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setUsername, setPassword } = authSlice.actions;

export default authSlice.reducer;
