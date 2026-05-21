import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../services/authApi";
import type { LoginPayload } from "../types/auth";
import {
  authStart,
  loginSuccess,
  authFailure,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  async function login(payload: LoginPayload) {
    const errors: { email?: string; password?: string } = {};
    if (!payload.email.trim())
      errors.email = "Please enter your work email address.";
    if (!payload.password.trim())
      errors.password = "Please enter your password.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    dispatch(authStart());

    try {
      const response = await loginApi(payload);

      if (response.success && response.data) {
        dispatch(
          loginSuccess({
            token: response.data.token,
            user: response.data.user,
          }),
        );
        toast.success("Login successful");
        console.log(response.data, "response data here");

        const from =
          (location.state as { from?: string })?.from ?? "/dashboard";
        navigate(from, { replace: true });
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err: any) {
      let message =
        err?.response?.data?.message || "Login failed. Please try again.";
      dispatch(authFailure(message));
      toast.error(message);
    }
  }

  return { login, isLoading, error, isAuthenticated, fieldErrors };
}
