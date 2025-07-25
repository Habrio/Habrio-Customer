// src/components/atoms/Avatar.jsx
import React from "react";
import clsx from "clsx";

/**
 * Avatar atom
 * Props:
 * - src: image url
 * - alt: alt text (for accessibility)
 * - size: 'sm' | 'md' | 'lg' | 'xl' | number (px)
 * - fallback: string (e.g. "AB" or placeholder SVG)
 * - status: 'online' | 'offline' | null (optional status dot)
 * - className: extra Tailwind classes
 */
const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-11 h-11 text-base",
  lg: "w-16 h-16 text-xl",
  xl: "w-24 h-24 text-2xl",
};

export default function Avatar({
  src,
  alt = "",
  size = "md",
  fallback = "",
  status = null,
  className = "",
  ...rest
}) {
  const sizeClass = typeof size === "number"
    ? `w-[${size}px] h-[${size}px]`
    : sizeMap[size] || sizeMap.md;

  return (
    <span className={clsx("relative inline-block", sizeClass, className)} {...rest}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full border border-divider bg-background-soft"
          loading="lazy"
        />
      ) : fallback ? (
        <span className="w-full h-full flex items-center justify-center rounded-full bg-background-soft text-text-secondary font-medium uppercase border border-divider">
          {typeof fallback === "string" ? fallback.slice(0, 2) : fallback}
        </span>
      ) : (
        // Default placeholder icon (can be replaced with your own SVG)
        <span className="w-full h-full flex items-center justify-center rounded-full bg-background-soft border border-divider text-text-secondary">
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 20c0-2.5 3-4.5 8-4.5s8 2 8 4.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </span>
      )}

      {status && (
        <span
          className={clsx(
            "absolute right-0 bottom-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white",
            status === "online" ? "bg-accent" : "bg-gray-400"
          )}
          aria-label={status === "online" ? "Online" : "Offline"}
        />
      )}
    </span>
  );
}
