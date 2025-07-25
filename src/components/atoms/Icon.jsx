// File: src/components/atoms/Icon.jsx
import React from "react";
import clsx from "clsx";

/**
 * Icon atom for SVG-based icons.
 * Props:
 * - name: string (key for built-in icons)
 * - size: number|string (width/height in px)
 * - className: additional Tailwind utility classes
 * - children: inline SVG element (optional)
 * - ...rest: other props (aria-label, etc)
 */
export default function Icon({
  name,
  size = 20,
  className = "",
  children,
  ...rest
}) {
  // Combine passed className and default inline-block
  const svgClass = clsx("inline-block", className);
  const commonProps = {
    width: size,
    height: size,
    className: svgClass,
    fill: "none",
    ...rest
  };

  // Predefined icons
  const iconMap = {
    home: (
      <svg viewBox="0 0 20 20" {...commonProps}>
        <path
          d="M3 9.5L10 4l7 5.5V16a1 1 0 01-1 1h-3a1 1 0 01-1-1V13a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 20 20" {...commonProps}>
        <circle
          cx={9}
          cy={9}
          r={7}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M15 15l4 4"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
    // Add additional icons as needed
  };

  // Determine SVG content: inline children or mapped icon
  const svgContent = children
    ? React.cloneElement(children, commonProps)
    : name && iconMap[name]
    ? iconMap[name]
    : null;

  return (
    <span role="img" aria-label={rest["aria-label"] || name}>
      {svgContent}
    </span>
  );
}
