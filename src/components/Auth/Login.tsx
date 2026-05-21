import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GrayMailIcon,
  PadlockIcon,
  PasswordIcon,
  PasswordSlashedIcon,
} from "../Common/Icons";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedFields, setFocusedFields] = useState<{ [k: string]: boolean }>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const isFilled = email.trim() !== "" && password !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/dashboard");
    if (!isFilled) return;
    const newErrors: { [k: string]: string } = {};
    if (!email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/verify-otp", { state: { email } });
    }, 1500);
  };

  const emailInputStyle = (field: string) =>
    `w-full h-[40px] pl-11 pr-12 py-3 rounded-xl border bg-white dark:bg-[#13141a] text-[#1D1D18] dark:text-white font-sans text-sm focus:outline-none transition-all duration-200 hover:bg-[#FFF9F2] dark:hover:bg-[#FF8600]/5 hover:border-primary/50 ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
        : "border-neutral-200 dark:border-[#2e303a] focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  const labelStyles = (field: string, value: string) =>
    `absolute pointer-events-none transition-all duration-500 ease-in-out font-sans select-none ${
      focusedFields[field] || value !== ""
        ? "left-0 top-[-22px] text-[0.875rem] text-[#5B6871] font-semibold"
        : "left-11 top-1/2 -translate-y-1/2 text-[0.875rem] text-[#5B6871] font-normal normal-case"
    }`;

  return (
    <div className="w-full max-w-[489px] p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="flex flex-col gap-[64px] w-[389px] h-[420px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[16px]">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans text-left m-0">
                Log in to your account
              </h2>
              <p className="text-sm text-text-main dark:text-gray-400 font-sans text-left">
                Proceed to create account and setup your organization
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[30px]">
              <div className="flex flex-col gap-3">
                <div className="group relative pt-5">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B0BABF] transition-colors duration-200">
                      <GrayMailIcon className="w-6 h-6" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() =>
                        setFocusedFields((p) => ({ ...p, email: true }))
                      }
                      onBlur={() =>
                        setFocusedFields((p) => ({ ...p, email: false }))
                      }
                      placeholder=""
                      className={emailInputStyle("email")}
                    />
                    <label
                      className={`${labelStyles("email", email)} flex items-center gap-1.5`}
                    >
                      <span>Email</span>
                    </label>
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="group relative pt-5">
                  <div
                    className={`relative w-full h-[40px] rounded-xl border bg-white dark:bg-[#13141a] transition-all duration-200 hover:bg-[#FFF9F2] dark:hover:bg-primary/5 hover:border-primary/50 ${
                      errors.password
                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200 dark:focus-within:ring-red-900/30"
                        : "border-neutral-200 dark:border-[#2e303a] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    }`}
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-[#B0BABF] transition-colors duration-200">
                      <PadlockIcon className="w-6 h-6" />
                    </span>

                    <div className="absolute left-11 right-12 top-1/2 -translate-y-1/2 h-[20px] overflow-hidden">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() =>
                          setFocusedFields((p) => ({ ...p, password: true }))
                        }
                        onBlur={() =>
                          setFocusedFields((p) => ({ ...p, password: false }))
                        }
                        placeholder=""
                        tabIndex={showPassword ? -1 : 0}
                        aria-hidden={showPassword}
                        className={`absolute text-[1rem] inset-0 w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 text-text-thick dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
                          showPassword ? "-translate-y-full" : "translate-y-0"
                        }`}
                      />

                      <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() =>
                          setFocusedFields((p) => ({ ...p, password: true }))
                        }
                        onBlur={() =>
                          setFocusedFields((p) => ({ ...p, password: false }))
                        }
                        placeholder=""
                        tabIndex={showPassword ? 0 : -1}
                        aria-hidden={!showPassword}
                        className={`absolute text-text-main inset-0 text-[0.875rem] w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
                          showPassword ? "translate-y-0" : "translate-y-full"
                        }`}
                      />
                    </div>

                    <label
                      className={`text-[0.875rem] absolute pointer-events-none transition-all duration-350 ease-in-out font-sans select-none z-20 ${
                        focusedFields.password || password !== ""
                          ? "left-0 top-[-22px] text-text-main font-semibold tracking-wider"
                          : "left-11 top-1/2 -translate-y-1/2 text-text-main font-normal normal-case"
                      }`}
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute text-[0.875rem] right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#B0BABF] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <PasswordSlashedIcon className="w-5 h-5" />
                      ) : (
                        <PasswordIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 font-medium mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
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
