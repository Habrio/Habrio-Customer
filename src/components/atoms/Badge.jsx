// src/components/atoms/Badge.jsx
import React from "react";
import clsx from "clsx";

/**
 * Badge atom
 * Props:
 * - children: text or node (label)
 * - intent: 'success' | 'warning' | 'error' | 'info' | 'neutral' | custom (controls color)
 * - size: 'sm' | 'md'
 * - pill: boolean (full-rounded)
 * - icon: ReactNode (optional)
 * - className: extra Tailwind classes
 * - ...rest: extra props (aria-label, etc)
 */
const intentMap = {
  success: "bg-accent/20 text-accent",
  warning: "bg-warning/20 text-warning",
  error:   "bg-error/20 text-error",
  info:    "bg-primary/10 text-primary",
  neutral: "bg-background-soft text-text-secondary",
};

const sizeMap = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  intent = "neutral",
  size = "sm",
  pill = false,
  icon,
  className = "",
  ...rest
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium",
        intentMap[intent] || intentMap.neutral,
        sizeMap[size],
        pill ? "rounded-full" : "rounded-md",
        className
      )}
      aria-label={rest["aria-label"] || typeof children === "string" ? children : ""}
      {...rest}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
