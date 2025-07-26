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
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12L12 3l9.75 9M4.5 10.5V21h4.875v-5.25c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21H20v-10.5"
        />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <circle
          cx={10}
          cy={10}
          r={7}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M16 16l5 5"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372a1.125 1.125 0 00-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
        />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9l9-6 9 6v11.25H3V9zM9.75 21V9.75M14.25 21V9.75"
        />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.75s7.5-4.108 7.5-11.25a7.5 7.5 0 10-15 0c0 7.142 7.5 11.25 7.5 11.25z"
        />
        <circle cx={12} cy={10.5} r={3} stroke="currentColor" strokeWidth={1.5} />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386a1.125 1.125 0 011.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    ),
    clipboard: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.42 48.42 0 00-1.123-.08m-5.801 0a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08A2.25 2.25 0 006.75 6.108V8.25m0 0H4.875A1.125 1.125 0 003.75 9.375v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375A1.125 1.125 0 0014.625 8.25H6.75z"
        />
      </svg>
    ),
    store: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3 3 0 003.75-.615A2.993 2.993 0 009.75 9.75a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3 3 0 003.75.614m-16.5 0a3 3 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M7.5 17.25h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H7.5a.75.75 0 00-.75.75v3c0 .414.336.75.75.75z"
        />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    'eye-off': (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395"
        />
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774"
        />
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    ),
    'chevron-left': (
      <svg viewBox="0 0 24 24" {...commonProps}>
        <path
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    ),
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
