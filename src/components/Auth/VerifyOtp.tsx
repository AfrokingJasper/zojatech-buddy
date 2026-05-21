import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOtp } from "../../hooks/useOtp";
import { SentEmailIcon, EmailVerifiedIcon } from "../Common/Icons";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email address";
  const [viewStep, setViewStep] = useState<"confirm" | "otp">("confirm");
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [localErrors, setLocalErrors] = useState("");
  const { verifyOtp, resendOtp, isLoading, fieldError } = useOtp();
  const [timer, setTimer] = useState(20);

  const errors = localErrors || fieldError;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (viewStep === "otp" && !isSuccess) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [viewStep, isSuccess]);

  useEffect(() => {
    if (viewStep !== "otp" || timer === 0 || isSuccess) return;
    const id = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [timer, viewStep, isSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    if (localErrors) setLocalErrors("");
    if (val !== "" && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      setLocalErrors("");
      inputRefs.current[3]?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(20);
    setOtp(new Array(4).fill(""));
    setLocalErrors("");
    await resendOtp();
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      setLocalErrors("Please enter the full 4-digit verification code");
      return;
    }
    setLocalErrors("");

    const success = await verifyOtp(otpCode);
    if (success) {
      setIsSuccess(true);
    }
  };

  const isOtpFilled = otp.every((d) => d !== "");

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-between w-full max-w-[489px] h-[385px] p-[83px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300 text-left">
        <EmailVerifiedIcon className="" />

        <div className="flex flex-col gap-2 h-[78px] text-center">
          <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans m-0">
            Email verified !
          </h2>
          <p className="text-sm text-text-main dark:text-gray-400 font-sans leading-relaxed">
            The verified email address will be associated with your account.
            Click on the button below to continue
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard", { replace: true })}
          className="w-[160px] h-[40px] text-[0.875rem] font-semibold py-2 px-4 rounded-xl bg-primary hover:bg-[#e07500] text-white transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg flex items-center justify-center cursor-pointer"
        >
          Continue
        </button>
      </div>
    );
  }

  if (viewStep === "confirm") {
    return (
      <div className="flex flex-col items-center justify-between w-full max-w-[489px] h-[463px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl p-6  shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300 text-left">
        <SentEmailIcon className="" />

        <div className="flex flex-col gap-2 w-[310px] text-center mb-8">
          <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans m-0">
            Confirm your email
          </h2>
          <p className="text-[0.875rem] text-text-main dark:text-gray-400 font-sans leading-relaxed">
            We’ve sent an email to{" "}
            <span className="font-semibold text-text-thick dark:text-white">
              {email}
            </span>{" "}
            with a an OTP to confirm your account. Check your inbox to activate
            your account. .
          </p>
        </div>

        <button
          type="button"
          onClick={() => setViewStep("otp")}
          className=" text-[0.875rem] font-semibold w-[160px] h-[40px] py-2 px-4 rounded-xl bg-primary hover:bg-[#e07500] text-white transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg flex items-center justify-center cursor-pointer"
        >
          Confirm email
        </button>

        <div className="mt-8 text-left text-[0.875rem] text-text-main dark:text-gray-400 font-sans border-t border-neutral-100 dark:border-neutral-800 pt-6">
          Didn’t get the mail?{" "}
          <button
            onClick={() => setViewStep("otp")}
            className="text-primary font-medium hover:underline transition-colors"
          >
            Resend
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full max-w-[445px] h-[424px] mx-auto bg-white dark:bg-[#181920] border border-[#DDE2E4] dark:border-[#2e303a]/60 rounded-2xl p-6 shadow-[10px_50px_50px_rgba(0,0,0,0.059)] dark:shadow-[10px_50px_50px_rgba(0,0,0,0.25)] transition-all duration-300 text-left">
      <div className="flex flex-col gap-[30px] w-[309px] h-[288px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[34px]">
          <div className="flex flex-col gap-[24px]">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-thick dark:text-white font-sans m-0">
                Verify your email
              </h2>
              <p className="text-sm text-text-main dark:text-gray-400 font-sans leading-relaxed">
                A four digit OTP code has been sent to your email{" "}
                <span className="font-semibold text-primary dark:text-white">
                  {email}
                </span>
              </p>
            </div>

            <div className="space-y-2 w-[272px]">
              <div className="flex gap-4 justify-between" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    placeholder="*"
                    className={`w-12.5 h-12.5 text-center text-2xl text-text-main font-bold rounded-xl border bg-white dark:bg-[#13141a] dark:text-white focus:outline-none focus:ring-2 transition-all duration-150 font-sans hover:bg-[#FFF9F2] dark:hover:bg-primary/5 hover:border-primary/50 ${
                      errors
                        ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30"
                        : "border-neutral-200 dark:border-[#2e303a] focus:border-primary focus:ring-primary/20"
                    }`}
                  />
                ))}
              </div>
              {errors && (
                <p className="text-xs text-red-500 font-medium text-left mt-2">
                  {errors}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isOtpFilled || isLoading}
            className={`w-[160px] text-[0.875rem] h-[40px] py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              !isOtpFilled
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
                Confirming Code...
              </>
            ) : (
              "Confirm code"
            )}
          </button>
        </form>

        <div className="flex text-[0.875rem] items-center gap-1 border-neutral-100 dark:border-neutral-800 mt-6">
          <p className="font-sans text-text-main dark:text-gray-400">
            Didn’t get the mail?
          </p>
          <div>
            {timer > 0 ? (
              <span className="font-semibold font-sans text-gray-400 dark:text-gray-500 bg-neutral-100 dark:bg-[#181920] px-3 py-1.5 rounded-full inline-block">
                Resend in <span className="text-primary">{timer}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold font-sans text-primary hover:underline focus:outline-none transition-colors cursor-pointer"
              >
                Resend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
