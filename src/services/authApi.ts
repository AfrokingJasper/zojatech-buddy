import axios from "axios";
import { apis } from "./api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ResendOtpPayload,
  ResendOtpResponse,
} from "../types/auth";

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(apis.login, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function registerApi(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await axios.post<RegisterResponse>(apis.register, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function verifyOtpApi(
  payload: VerifyOtpPayload,
  token: string,
): Promise<VerifyOtpResponse> {
  const response = await axios.post<VerifyOtpResponse>(
    apis.verifyOtp,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function resendOtpApi(
  payload: ResendOtpPayload,
  token: string,
): Promise<ResendOtpResponse> {
  const response = await axios.post<ResendOtpResponse>(
    apis.resendOtp,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
