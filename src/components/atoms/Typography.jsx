// src/components/atoms/Typography.jsx
import React from "react";
import clsx from "clsx";

/**
 * Heading atom
 * Props:
 * - level: 1 | 2 | 3 | 4 (renders h1-h4)
 * - children: node
 * - className: string
 * - ...rest: extra props
 */
export function Heading({ level = 1, children, className = "", ...rest }) {
  const Tag = `h${level}`;
  const styles = {
    1: "text-2xl font-bold text-text-primary md:text-3xl",
    2: "text-xl font-semibold text-text-primary md:text-2xl",
    3: "text-lg font-semibold text-text-primary md:text-xl",
    4: "text-base font-medium text-text-primary md:text-lg",
  };
  return (
    <Tag className={clsx(styles[level] || styles[1], className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * BodyText atom
 * Props:
 * - size: "sm" | "md" | "lg"
 * - color: "primary" | "secondary" | "error" | "success" | "muted"
 * - as: elementType (e.g., 'p', 'span', 'div')
 * - className: string
 * - ...rest
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
    sm: "text-xs md:text-sm",
    md: "text-base",
    lg: "text-lg md:text-xl",
  };
  const colorMap = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    error: "text-error",
    success: "text-success",
    muted: "text-text-secondary opacity-80",
  };
  return (
    <Tag className={clsx(sizeMap[size], colorMap[color], className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Caption atom
 * For extra small helper or status text
 */
export function Caption({ children, className = "", ...rest }) {
  return (
    <span className={clsx("text-xs text-text-secondary", className)} {...rest}>
      {children}
    </span>
  );
}
