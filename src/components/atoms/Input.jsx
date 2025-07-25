// src/components/atoms/Input.jsx
import React, { useState } from "react";
import clsx from "clsx";

/**
 * PRO Input atom
 * Props:
 * - type: string (text, number, password, etc.)
 * - placeholder: string
 * - value, onChange: controlled input
 * - disabled: boolean
 * - error: string (error message)
 * - success: string (success message)
 * - leftIcon, rightIcon: <Icon />
 * - className: string
 * - ...rest: native input props
 */
export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error = "",
  success = "",
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  // If type=password, allow toggle
  const actualType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <div
        className={clsx(
          "flex items-center border rounded-lg px-3 bg-white transition h-11",
          error
            ? "border-error focus-within:border-error"
            : "border-divider focus-within:border-primary",
          disabled && "bg-background-soft text-text-disabled opacity-60 cursor-not-allowed",
          className
        )}
      >
        {leftIcon && <span className="mr-2 text-xl text-text-secondary">{leftIcon}</span>}

        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "flex-1 bg-transparent border-none outline-none text-base placeholder-text-secondary",
            "focus:ring-0 disabled:cursor-not-allowed",
            leftIcon && "pl-0",
            rightIcon && type !== "password" && "pr-0"
          )}
          {...rest}
        />

        {/* Password reveal for type=password */}
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="ml-2 text-text-secondary focus:outline-none"
            disabled={disabled}
          >
            {showPassword ? (
              // You can replace these with your own SVG icons
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M10 13.333a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666z" stroke="currentColor"/>
                <path d="M1.667 10S4.167 4.167 10 4.167c5.833 0 8.333 5.833 8.333 5.833s-2.5 5.833-8.333 5.833c-5.833 0-8.333-5.833-8.333-5.833z" stroke="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M1.667 1.667l16.666 16.666" stroke="currentColor"/>
                <path d="M10 13.333a3.333 3.333 0 01-3.072-2.128M7.186 7.186A3.333 3.333 0 0112.814 12.814M17.04 13.873C16.07 15.17 13.578 17.5 10 17.5c-5.833 0-8.333-5.833-8.333-5.833A15.772 15.772 0 014.17 6.165" stroke="currentColor"/>
              </svg>
            )}
          </button>
        )}

        {/* Optional right icon (for search, clear, etc) */}
        {rightIcon && type !== "password" && (
          <span className="ml-2 text-xl text-text-secondary">{rightIcon}</span>
        )}
      </div>
      {error && (
        <div className="text-error text-xs mt-1">{error}</div>
      )}
      {!error && success && (
        <div className="text-success text-xs mt-1">{success}</div>
      )}
    </div>
  );
}
