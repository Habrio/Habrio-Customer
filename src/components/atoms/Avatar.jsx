// File: src/components/atoms/Avatar.jsx
import React from "react";
import clsx from "clsx";

/**
 * Avatar atom
 * Props:
 * - src: image URL
 * - alt: alt text for accessibility
 * - size: 'sm' | 'md' | 'lg' | 'xl' | number (px)
 * - fallback: string (initials) or ReactNode
 * - status: 'online' | 'offline' | null
 * - className: additional Tailwind utility classes
 */

const SIZE_CLASSES = {
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
  const sizeClass =
    typeof size === 'number'
      ? `w-[${size}px] h-[${size}px]`
      : SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <span
      className={clsx(
        'relative inline-block',
        sizeClass,
        className
      )}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover rounded-full border border-divider bg-background-soft"
        />
      ) : fallback ? (
        <span
          className="flex items-center justify-center w-full h-full rounded-full bg-background-soft text-text-secondary font-medium border border-divider uppercase"
        >
          {typeof fallback === 'string' ? fallback.slice(0, 2) : fallback}
        </span>
      ) : (
        <span
          className="flex items-center justify-center w-full h-full rounded-full bg-background-soft text-text-secondary border border-divider"
        >
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-secondary"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-2.5 3-4.5 8-4.5s8 2 8 4.5" />
          </svg>
        </span>
      )}

      {status && (
        <span
          className={clsx(
            'absolute -bottom-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full ring-2 ring-background',
            status === 'online' ? 'bg-accent' : 'bg-divider'
          )}
          aria-label={status === 'online' ? 'Online' : 'Offline'}
        />
      )}
    </span>
  );
}
