import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOtpApi, resendOtpApi } from "../services/authApi";
import {
  authStart,
  verifyOtpSuccess,
  authFailure,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useOtp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, token, user } = useAppSelector((state) => state.auth);
  const [fieldError, setFieldError] = useState<string>("");

  async function verifyOtp(otp: string): Promise<boolean> {
    if (!otp || otp.length < 4) {
      setFieldError("Please enter a valid OTP");
      return false;
    }
    if (!token) {
      toast.error("Please register or login again.");
      navigate("/login");
      return false;
    }
    setFieldError("");

    dispatch(authStart());

    try {
      const response = await verifyOtpApi({ otp }, token);

      if (response.success) {
        dispatch(verifyOtpSuccess());
        toast.success(response.message || "OTP verified successfully");
        return true;
      } else {
        throw new Error(response.message || "OTP verification failed");
      }
    } catch (err: any) {
      let message =
        err?.response?.data?.message ||
        "OTP verification failed. Please try again.";
      dispatch(authFailure(message));
      toast.error(message);
      return false;
    }
  }

  async function resendOtp() {
    if (!token || !user?.email) {
      toast.error(
        "Please register or login again if you already have an account.",
      );
      navigate("/signup");
      return;
    }

    try {
      const response = await resendOtpApi({ email: user.email }, token);
      if (response.success) {
        toast.success(response.message || "OTP resent successfully");
      } else {
        throw new Error(response.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      let message =
        err?.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      dispatch(authFailure(message));
      toast.error(message);
    }
  }

  return { verifyOtp, resendOtp, isLoading, fieldError };
}
