import React, { useState } from "react";
import { PadlockIcon, PasswordIcon, PasswordSlashedIcon } from "../Icons";

interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  label: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export default function PasswordInput({
  label,
  error,
  size = "md",
  value,
  onChange,
  onFocus,
  onBlur,
  className = "",
  ...props
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = value !== undefined && value !== "";

  const sizeStyles = {
    sm: "h-[40px] py-2",
    md: "h-[46px] py-3",
    lg: "h-[52px] py-4",
  };

  return (
    <div className={`group relative pt-5 w-full ${className}`}>
      <div
        className={`relative w-full rounded-xl border bg-white dark:bg-[#13141a] transition-all duration-200 hover:bg-[#FFF9F2] dark:hover:bg-primary/5 hover:border-primary/50 flex items-center ${
          sizeStyles[size]
        } ${
          error
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
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            placeholder=""
            tabIndex={showPassword ? -1 : 0}
            aria-hidden={showPassword}
            className={`absolute text-[0.875rem] inset-0 w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 text-text-thick dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
              showPassword ? "-translate-y-full" : "translate-y-0"
            }`}
            {...props}
          />

          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            placeholder=""
            tabIndex={showPassword ? 0 : -1}
            aria-hidden={!showPassword}
            className={`absolute text-[0.875rem] inset-0 w-full h-full border-none bg-transparent p-0 outline-none focus:outline-none focus:ring-0 text-text-thick dark:text-white font-sans text-sm transition-transform ease-in-out duration-300 ${
              showPassword ? "translate-y-0" : "translate-y-full"
            }`}
            {...props}
          />
        </div>

        <label
          className={`absolute pointer-events-none transition-all duration-350 ease-in-out font-sans select-none z-20 ${
            isFocused || hasValue
              ? "left-0 top-[-22px] text-[0.875rem] text-text-main font-semibold"
              : "left-11 top-1/2 -translate-y-1/2 text-[0.875rem] text-text-main font-normal normal-case"
          }`}
        >
          {label}
        </label>

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#B0BABF] hover:text-primary transition-colors focus:outline-none cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <PasswordSlashedIcon className="w-6 h-6" />
          ) : (
            <PasswordIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium mt-1 pl-1">{error}</p>
      )}
    </div>
  );
}
