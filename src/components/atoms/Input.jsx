// File: src/components/atoms/Input.jsx
import React, { useState } from "react";
import clsx from "clsx";
import Icon from "../atoms/Icon";

/**
 * Input atom
 * Props:
 * - type: string (e.g. 'text', 'password')
 * - placeholder: string
 * - value: string
 * - onChange: function
 * - disabled: boolean
 * - error: string (error message)
 * - success: string (success message)
 * - leftIcon: ReactNode
 * - rightIcon: ReactNode
 * - className: additional Tailwind utility classes
 * - ...rest: other input props
 */
export default function Input({
  type = "text",
  placeholder = "",
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
  const actualType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <div
        className={clsx(
          "flex items-center px-3 h-11 rounded-md bg-background-soft transition",
          error
            ? "border border-error focus-within:border-error"
            : "border border-divider focus-within:border-primary",
          disabled && "bg-background-soft text-text-secondary opacity-60 cursor-not-allowed",
          className
        )}
      >
        {leftIcon && (
          <span className="mr-2 text-xl text-text-secondary flex-shrink-0">
            {leftIcon}
          </span>
        )}

        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "flex-1 bg-transparent border-none outline-none text-base placeholder-text-secondary focus:ring-0 disabled:cursor-not-allowed",
            leftIcon && "pl-0",
            rightIcon && type !== "password" && "pr-0"
          )}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            disabled={disabled}
            className="ml-2 text-text-secondary focus:outline-none"
          >
            <Icon name={showPassword ? "eye-off" : "eye"} size={20} />
          </button>
        )}

        {rightIcon && type !== "password" && (
          <span className="ml-2 text-xl text-text-secondary flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <div className="text-error text-xs mt-1">{error}</div>}
      {!error && success && <div className="text-success text-xs mt-1">{success}</div>}
    </div>
  );
}
