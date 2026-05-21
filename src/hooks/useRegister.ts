import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../services/authApi";
import type { RegisterPayload } from "../types/auth";
import {
  authStart,
  registerSuccess,
  authFailure,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [fieldErrors, setFieldErrors] = useState<Partial<RegisterPayload>>({});

  async function register(payload: RegisterPayload) {
    const errors: Partial<RegisterPayload> = {};
    if (!payload.first_name?.trim())
      errors.first_name = "Please enter your first name";
    if (!payload.last_name?.trim())
      errors.last_name = "Please enter your last name";
    if (!payload.email?.trim())
      errors.email = "Please enter your work email address";
    if (!payload.password?.trim())
      errors.password = "Please enter your password";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    dispatch(authStart());

    try {
      const response = await registerApi(payload);

      if (response.success && response.data) {
        dispatch(
          registerSuccess({
            token: response.data.token,
            email: payload.email,
          }),
        );
        toast.success(response.message || "Registration successful");

        navigate("/verify-otp", { state: { email: payload.email } });
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (err: any) {
      let message =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      if (
        err?.response?.data?.message === "The email has already been taken."
      ) {
        navigate("/login");
      }

      dispatch(authFailure(message));
      toast.error(message);
    }
  }

  return { register, isLoading, error, fieldErrors };
}
