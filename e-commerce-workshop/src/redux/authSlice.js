import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");
const savedRefreshToken = localStorage.getItem("refreshToken");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  refreshToken: savedRefreshToken || null,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      const { user, token, refreshToken } = action.payload;

      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;