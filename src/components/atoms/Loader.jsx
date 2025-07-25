// src/components/atoms/Loader.jsx
import React from "react";
import clsx from "clsx";

/**
 * Spinner loader atom
 * Props:
 * - size: number (px, default 24)
 * - color: Tailwind class ("text-primary", "text-white", etc.)
 * - className: extra classes
 */
export function Spinner({ size = 24, color = "text-primary", className = "", ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      className={clsx("animate-spin", color, className)}
      viewBox="0 0 24 24"
      aria-label="Loading"
      {...rest}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
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
 * Skeleton loader atom (for cards, lists, etc.)
 * Props:
 * - width, height: size in px (default w-full h-4)
 * - rounded: boolean (default true)
 * - className: extra classes
 * Usage:
 * <Skeleton width={200} height={40} />
 */
export function Skeleton({
  width,
  height,
  rounded = true,
  className = "",
  ...rest
}) {
  return (
    <div
      className={clsx(
        "bg-divider/40 animate-pulse",
        rounded ? "rounded-lg" : "",
        className
      )}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
      aria-label="Loading"
      {...rest}
    />
  );
}
