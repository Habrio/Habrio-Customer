// File: src/components/atoms/Typography.jsx
import React from "react";
import clsx from "clsx";

/**
 * Heading atom
 * Props:
 * - level: 1 | 2 | 3 | 4
 * - children: node
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export function Heading({ level = 1, children, className = "", ...rest }) {
  const Tag = `h${level}`;
  const sizes = {
    1: "text-3xl font-semibold text-text-primary",
    2: "text-2xl font-semibold text-text-primary",
    3: "text-xl font-medium text-text-primary",
    4: "text-lg font-medium text-text-primary",
  };
  return (
    <Tag
      className={clsx(sizes[level] || sizes[1], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * BodyText atom
 * Props:
 * - size: 'sm' | 'md' | 'lg'
 * - color: 'primary' | 'secondary' | 'error' | 'success' | 'muted'
 * - as: string (element type, e.g. 'p', 'span')
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export function BodyText({
  size = "md",
  color = "primary",
  as = "p",
  className = "",
  children,
  ...rest
}) {
  const Tag = as;
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  const colorMap = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    error: "text-error",
    success: "text-success",
    muted: "text-text-secondary opacity-80",
  };
  return (
    <Tag
      className={clsx(sizeMap[size], colorMap[color], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Caption atom
 * Props:
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export function Caption({ children, className = "", ...rest }) {
  return (
    <span
      className={clsx("text-xs text-text-secondary", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
