import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { GrayMailIcon } from "../Common/Icons";
import TextInput from "../Common/Input/TextInput";
import PasswordInput from "../Common/Input/PasswordInput";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { login, isLoading, error: apiError, fieldErrors } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localErrors, setLocalErrors] = useState<{ [k: string]: string }>({});
  const isFilled = email.trim() !== "" && password !== "";

  const errors = { ...localErrors, ...fieldErrors };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFilled) return;
    const newErrors: { [k: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }
    setLocalErrors({});

    // to bypass login api till it is fixed
    dispatch(
      loginSuccess({
        token: "token-for-failed-auth",
        user: {
          id: email,
          first_name: email.split("@")[0],
          last_name: email.split("@")[1],
          email: email,
        },
      }),
    );
    return;

    await login({ email, password });
  };

  return (
    <div className="w-full max-w-[489px] p-[20px] xl:p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="flex flex-col gap-[64px] w-full max-w-[389px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[16px]">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold! text-text-thick dark:text-white font-sans text-left m-0">
                Log in to your account
              </h2>
              <p className="text-sm text-text-main dark:text-gray-400 font-sans text-left">
                Proceed to create account and setup your organization
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[30px]">
              {apiError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30">
                  {apiError}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <TextInput
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<GrayMailIcon className="w-6 h-6" />}
                  error={errors.email}
                  size="sm"
                />

                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  size="sm"
                />
              </div>

              <button
                type="submit"
                disabled={!isFilled || isLoading}
                className={`w-full py-3.5 px-4 h-[40px] rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  !isFilled
                    ? "bg-[#ECEDED] text-[#C3C7CE] cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-600"
                    : "bg-primary hover:bg-[#e07500] text-white shadow-md shadow-primary/10 hover:shadow-lg cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
          <div className="text-left text-sm text-text-main dark:text-gray-400 font-sans leading-normal">
            By clicking the button above, you agree to our{" "}
            <a
              href="#terms"
              className="text-primary hover:underline font-semibold transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="text-primary hover:underline font-semibold transition-colors"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
        <div className="text-left text-[0.875rem] text-text-main dark:text-gray-400 font-sans">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
