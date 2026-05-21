export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

export interface ApiBaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUser {
  id?: number | string;
  first_name?: string;
  last_name?: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  name?: string;
}

export interface LoginResponseData {
  user: AuthUser;
  token: string;
}

export interface RegisterResponseData {
  token: string;
  opt?: number;
  otp?: number;
}

export type LoginResponse = ApiBaseResponse<LoginResponseData>;
export type RegisterResponse = ApiBaseResponse<RegisterResponseData>;

export interface VerifyOtpPayload {
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export type VerifyOtpResponse = ApiBaseResponse<any>;
export type ResendOtpResponse = ApiBaseResponse<{ opt?: number; otp?: number }>;

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
