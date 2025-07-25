// File: src/components/atoms/Badge.jsx
import React from "react";
import clsx from "clsx";

/**
 * Badge atom
 * Props:
 * - children: label text or node
 * - intent: 'success' | 'warning' | 'error' | 'info' | 'neutral'
 * - size: 'sm' | 'md'
 * - pill: boolean (full rounded)
 * - icon: ReactNode (optional leading icon)
 * - className: additional Tailwind utility classes
 * - ...rest: other props (e.g. aria-label)
 */

const INTENT_CLASSES = {
  success: "bg-accent/20 text-accent",
  warning: "bg-warning/20 text-warning",
  error:   "bg-error/20 text-error",
  info:    "bg-info/20 text-info",
  neutral: "bg-background-soft text-text-secondary"
};

const SIZE_CLASSES = {
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
  const intentClass = INTENT_CLASSES[intent] || INTENT_CLASSES.neutral;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.sm;
  const radiusClass = pill ? "rounded-full" : "rounded-md";

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium",
        intentClass,
        sizeClass,
        radiusClass,
        className
      )}
      aria-label={rest["aria-label"] || (typeof children === "string" ? children : undefined)}
      {...rest}
    >
      {icon && <span className="mr-1 flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
