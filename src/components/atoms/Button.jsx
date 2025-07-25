// src/components/atoms/Button.jsx
import React from "react";
import clsx from "clsx";

// Loader spinner atom (minimal, atomic)
function Spinner({ className }) {
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
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
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
 * PRO Button atom
 * Props:
 * - children: text
 * - type: 'button' | 'submit'
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - size: 'md' | 'lg' | 'sm'
 * - fullWidth: boolean
 * - disabled: boolean
 * - loading: boolean
 * - leftIcon/rightIcon: <Icon />
 * - className: string (extra classes)
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
  // Style maps
  const base = "inline-flex items-center justify-center font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-card";
  const sizes = {
    sm: "h-9 px-3 text-sm rounded-md",
    md: "h-11 px-4 text-base rounded-lg",
    lg: "h-14 px-6 text-lg rounded-xl",
  };
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark disabled:bg-text-disabled disabled:text-white",
    secondary: "bg-white text-primary border border-primary hover:bg-primary/10 active:bg-primary/20 disabled:text-text-disabled disabled:border-gray-200",
    ghost: "bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20 disabled:text-text-disabled",
  };

  return (
    <button
      type={type}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        { "w-full": fullWidth, "opacity-60 cursor-not-allowed": disabled || loading },
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2" />}
      {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
