import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser, AuthState } from "../../types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>,
    ) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ token: string; email: string }>,
    ) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = action.payload.token;
      state.user = { email: action.payload.email };
      state.error = null;
    },
    verifyOtpSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  authStart,
  loginSuccess,
  registerSuccess,
  verifyOtpSuccess,
  authFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
