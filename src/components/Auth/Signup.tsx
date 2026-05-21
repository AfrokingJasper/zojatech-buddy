import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import {
  UserIcon,
  GrayMailIcon,
  MailIcon,
  GoogleIcon,
  PadlockIcon,
  PasswordIcon,
  PasswordSlashedIcon,
  InfoIcon,
} from "../Common/Icons";

export default function Signup() {
  const [step, setStep] = useState<"select" | "email">("select");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedFields, setFocusedFields] = useState<{ [k: string]: boolean }>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading, error: apiError, fieldErrors } = useRegister();
  const [localErrors, setLocalErrors] = useState<{ [k: string]: string }>({});

  const errors = { ...localErrors, ...fieldErrors };

  const hiddenRef = useRef<HTMLInputElement>(null);
  const visibleRef = useRef<HTMLInputElement>(null);

  const isFilled =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled) return;
    const newErrors: { [k: string]: string } = {};
    if (!firstName.trim())
      newErrors.first_name = "Please enter your first name";
    if (!lastName.trim()) newErrors.last_name = "Please enter your last name";
    if (!email.trim()) {
      newErrors.email = "Please enter your work email address";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Please enter your password";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }
    setLocalErrors({});

    await register({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
  };

  const inputStyles = (field: keyof typeof errors) =>
    `w-full pl-11 pr-12 py-3 text-[0.875rem] text-text-main rounded-xl border bg-white dark:bg-[#13141a] text-[#1D1D18] dark:text-white transition-all duration-200 font-sans text-sm focus:outline-none hover:bg-[#FFF9F2] dark:hover:bg-[#FF8600]/5 hover:border-primary/50 ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
        : "border-neutral-200 dark:border-[#2e303a] focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  const labelStyles = (field: keyof typeof focusedFields, value: string) =>
    `absolute pointer-events-none transition-all duration-500 ease-in-out font-sans select-none ${
      focusedFields[field] || value !== ""
        ? "left-0 top-[-22px] text-[0.875rem] text-[#5B6871] font-semibold"
        : "left-11 top-1/2 -translate-y-1/2 text-[0.875rem] text-[#5B6871] font-normal normal-case"
    }`;

  if (step === "select") {
    return (
      <div className="w-full max-w-[489px] p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
        <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans text-left mb-8">
          Register your account
        </h2>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 text-text-thick dark:text-white font-semibold text-sm transition-all cursor-pointer bg-white dark:bg-[#181920] hover:border-primary/50 group duration-200"
          >
            <MailIcon className="w-5 h-5 text-text-thick dark:text-white transition-transform duration-200 group-hover:scale-110" />
            Sign up with email
          </button>

          <div className="relative flex items-center justify-center my-6 py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <span className="relative px-3 bg-white dark:bg-[#181920] text-xs text-text-main dark:text-gray-500 font-sans font-medium uppercase tracking-wider">
              or
            </span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 text-text-thick dark:text-white font-semibold text-sm transition-all cursor-pointer bg-white dark:bg-[#181920] hover:border-primary/50 group duration-200"
          >
            <GoogleIcon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
            Sign up with Google
          </button>
        </div>

        <div className="mt-8 text-left text-sm text-text-main dark:text-gray-400 font-sans leading-normal">
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

        <div className="mt-8 text-left text-[0.875rem] text-text-main dark:text-gray-400 font-sans border-t border-neutral-100 dark:border-neutral-800 pt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[489px] p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="flex flex-col w-[389px] h-[472px] gap-[64px]">
        <div className="flex flex-col gap-[33px]">
          <div className="flex flex-col gap-[16px]">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans text-left m-0">
                Register your account
              </h2>
              <p className="text-sm text-text-main dark:text-gray-400 font-sans text-left">
                Proceed to create account and setup your organization.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7.5">
              {apiError && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30">
                  {apiError}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group relative pt-5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B0BABF] transition-colors duration-200">
                        <UserIcon className="w-6 h-6" />
                      </span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() =>
                          setFocusedFields((prev) => ({
                            ...prev,
                            first_name: true,
                          }))
                        }
                        onBlur={() =>
                          setFocusedFields((prev) => ({
                            ...prev,
                            first_name: false,
                          }))
                        }
                        placeholder=""
                        className={inputStyles("first_name")}
                      />
                      <label className={labelStyles("first_name", firstName)}>
                        First Name
                      </label>
                    </div>
                    {errors.first_name && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  <div className="group relative pt-5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B0BABF] transition-colors duration-200">
                        <UserIcon className="w-6 h-6" />
                      </span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() =>
                          setFocusedFields((prev) => ({
                            ...prev,
                            last_name: true,
                          }))
                        }
                        onBlur={() =>
                          setFocusedFields((prev) => ({
                            ...prev,
                            last_name: false,
                          }))
                        }
                        placeholder=""
                        className={inputStyles("last_name")}
                      />
                      <label className={labelStyles("last_name", lastName)}>
                        Last Name
                      </label>
                    </div>
                    {errors.last_name && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>

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
                      className={inputStyles("email")}
                    />
                    <label
                      className={`${labelStyles("email", email)} flex items-center gap-1.5`}
                    >
                      <span>Work email</span>
                      {(focusedFields.email || email !== "") && (
                        <span className="pointer-events-auto group/tooltip relative inline-block cursor-pointer">
                          <InfoIcon className="w-3.5 h-3.5 text-[#84919A] hover:text-blue-500 hover:scale-110 transition-all duration-150" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-900 text-white text-[11px] rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none font-normal normal-case leading-relaxed whitespace-normal">
                            Please enter your official work email address.
                          </span>
                        </span>
                      )}
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
                    className={`relative w-full h-[46px] rounded-xl border bg-white dark:bg-[#13141a] transition-all duration-200 hover:bg-[#FFF9F2] dark:hover:bg-primary/5 hover:border-primary/50 ${
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
                        ref={hiddenRef}
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
                        className={`absolute text-[0.875rem] inset-0 w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 text-text-main dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
                          showPassword ? "-translate-y-full" : "translate-y-0"
                        }`}
                      />

                      <input
                        ref={visibleRef}
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
                        className={`absolute text-[0.875rem] inset-0 w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 text-text-main dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
                          showPassword ? "translate-y-0" : "translate-y-full"
                        }`}
                      />
                    </div>

                    <label
                      className={`absolute pointer-events-none transition-all duration-350 ease-in-out font-sans select-none z-20 ${
                        focusedFields.password || password !== ""
                          ? "left-0 top-[-22px] text-[0.875rem] text-text-main font-semibold"
                          : "left-11 top-1/2 -translate-y-1/2 text-[0.875rem] text-text-main font-normal normal-case"
                      }`}
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#B0BABF] hover:text-primary transition-colors focus:outline-none cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <PasswordSlashedIcon className="w-6 h-6" />
                      ) : (
                        <PasswordIcon className="w-6 h-6" />
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
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
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
                    Creating Account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>
          </div>

          <div className="text-left text-sm text-text-main dark:text-gray-400 font-sans">
            By clicking the button above, you agree to our{" "}
            <a
              href="#terms"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>

        <div className="text-left text-[0.875rem] text-text-main dark:text-gray-400 font-sans">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
