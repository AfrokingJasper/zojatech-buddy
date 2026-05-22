import React, { useState } from "react";
import { InfoIcon } from "../Icons";

interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  infoTooltip?: string;
}

export default function TextInput({
  label,
  icon,
  error,
  size = "md",
  infoTooltip,
  value,
  onChange,
  onFocus,
  onBlur,
  className = "",
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== "";

  const sizeStyles = {
    sm: "h-[40px] py-2",
    md: "h-[46px] py-3",
    lg: "h-[52px] py-4",
  };

  const inputStyle = `w-full h-full pl-11 pr-4 bg-transparent text-[#1D1D18] dark:text-white font-sans text-sm focus:outline-none transition-all duration-200`;

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
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#B0BABF] transition-colors duration-200 z-10 flex items-center justify-center">
            {icon}
          </span>
        )}

        <input
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
          className={inputStyle}
          {...props}
        />

        <label
          className={`absolute pointer-events-none transition-all duration-500 ease-in-out font-sans select-none flex items-center gap-1.5 ${
            isFocused || hasValue
              ? "left-0 top-[-22px] text-[0.875rem] text-text-main font-semibold"
              : "left-11 top-1/2 -translate-y-1/2 text-[0.875rem] text-text-main font-normal normal-case"
          }`}
        >
          <span>{label}</span>
          {(isFocused || hasValue) && infoTooltip && (
            <span className="pointer-events-auto group/tooltip relative inline-block cursor-pointer z-30">
              <InfoIcon className="w-3.5 h-3.5 text-[#84919A] hover:text-blue-500 hover:scale-110 transition-all duration-150" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-900 text-white text-[11px] rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none font-normal normal-case leading-relaxed whitespace-normal">
                {infoTooltip}
              </span>
            </span>
          )}
        </label>
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium mt-1 pl-1">{error}</p>
      )}
    </div>
  );
}
