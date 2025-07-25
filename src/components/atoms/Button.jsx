// File: src/components/atoms/Button.jsx
import React from "react";
import clsx from "clsx";

/**
 * Spinner icon for loading state
 */
function Spinner({ className = "" }) {
  return (
    <svg
      className={clsx("animate-spin h-5 w-5 text-white", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/**
 * Button atom
 * Props:
 * - children: text or node
 * - type: 'button' | 'submit'
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 * - fullWidth: boolean
 * - disabled: boolean
 * - loading: boolean
 * - leftIcon: ReactNode
 * - rightIcon: ReactNode
 * - className: additional Tailwind utility classes
 * - ...rest: native button props
 */
export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-card";

  const sizeMap = {
    sm: "h-9 px-3 text-sm rounded-md",
    md: "h-11 px-4 text-base rounded-lg",
    lg: "h-14 px-6 text-lg rounded-xl",
  };

  const variantMap = {
    primary:
      "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark disabled:bg-text-secondary disabled:text-white",
    secondary:
      "bg-white text-primary border border-primary hover:bg-primary/10 active:bg-primary/20 disabled:text-text-secondary disabled:border-divider",
    ghost:
      "bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20 disabled:text-text-secondary",
  };

  const classes = clsx(
    baseClasses,
    sizeMap[size],
    variantMap[variant],
    fullWidth && "w-full",
    (disabled || loading) && "opacity-60 cursor-not-allowed",
    className
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2" />}
      {!loading && leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
