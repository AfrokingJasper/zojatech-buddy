import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { UserIcon, GrayMailIcon, MailIcon, GoogleIcon } from "../Common/Icons";
import TextInput from "../Common/Input/TextInput";
import PasswordInput from "../Common/Input/PasswordInput";
import { loginSuccess } from "../../store/slices/authSlice";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../store/hooks";

export default function Signup() {
  const [step, setStep] = useState<"select" | "email">("select");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error: apiError, fieldErrors } = useRegister();
  const [localErrors, setLocalErrors] = useState<{ [k: string]: string }>({});

  const dispatch = useAppDispatch();

  const errors = { ...localErrors, ...fieldErrors };

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

    // temp bypass mode till api is fixed
    toast.success("Registration successful (Bypass Mode)");
    dispatch(
      loginSuccess({
        token: "token-for-failed-auth",
        user: {
          id: email,
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      }),
    );
    return;

    await register({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
  };

  if (step === "select") {
    return (
      <div className="w-full max-w-[489px] p-[20px] sm:p-[40px] xl:p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
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
    <div className="w-full max-w-[489px] p-[20px] sm:p-[40px] xl:p-[50px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="flex flex-col w-full max-w-[389px] min-h-[472px] gap-[64px]">
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
                  <TextInput
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    icon={<UserIcon className="w-6 h-6" />}
                    error={errors.first_name}
                    size="sm"
                  />

                  <TextInput
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    icon={<UserIcon className="w-6 h-6" />}
                    error={errors.last_name}
                    size="sm"
                  />
                </div>

                <TextInput
                  type="email"
                  label="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<GrayMailIcon className="w-6 h-6" />}
                  error={errors.email}
                  infoTooltip="Please enter your official work email address."
                />

                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
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
