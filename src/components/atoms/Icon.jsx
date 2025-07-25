// src/components/atoms/Icon.jsx
import React from "react";
import clsx from "clsx";

/**
 * Icon atom for SVG-based icons.
 * Props:
 * - name: (optional) string — load icon by name from assets/icons (if using dynamic import)
 * - size: number|string (default: 20)
 * - className: extra Tailwind classes
 * - children: SVG element (for inline SVG)
 * - ...rest: extra props (aria-label, etc)
 *
 * Usage:
 * <Icon><YourSVGIcon /></Icon>
 * <Icon name="home" />
 */
export default function Icon({
  name,
  size = 20,
  className = "",
  children,
  ...rest
}) {
  // Static import map for known icons (expand as needed)
  const iconMap = {
    home: (
      <svg viewBox="0 0 20 20" fill="none" width={size} height={size}>
        <path d="M3 9.5L10 4l7 5.5V16a1 1 0 01-1 1h-3a1 1 0 01-1-1V13a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth={1.5} />
      </svg>
    ),
    search: (
      <svg fill="none" viewBox="0 0 20 20" width={size} height={size}>
        <circle cx={9} cy={9} r={7} stroke="currentColor" strokeWidth={1.5}/>
        <path d="M15 15l4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    ),
    // Add more icons as needed...
  };

  // Prefer passed children (inline SVG), fallback to iconMap by name
  const content = children
    ? React.cloneElement(children, {
        width: size,
        height: size,
        className: clsx("inline-block", children.props.className),
        ...rest,
      })
    : name && iconMap[name]
    ? React.cloneElement(iconMap[name], {
        width: size,
        height: size,
        className: clsx("inline-block", className),
        ...rest,
      })
    : null;

  return (
    <span
      className={clsx(
        "icon",
        className
      )}
      role="img"
      aria-label={rest["aria-label"] || name}
      {...rest}
    >
      {content}
    </span>
  );
}
