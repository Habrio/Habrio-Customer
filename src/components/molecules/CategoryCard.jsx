// File: src/components/molecules/CategoryCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";

/**
 * CategoryCard molecule
 * Props:
 * - icon: ReactNode (SVG icon or image)
 * - label: string
 * - active: boolean
 * - disabled: boolean
 * - onClick: function (optional)
 * - className: additional Tailwind utility classes
 */
export default function CategoryCard({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <Card
      variant={active ? "soft" : "default"}
      padding="sm"
      clickable={!!onClick && !disabled}
      className={clsx(
        "flex flex-col items-center w-20 h-24 transition relative",
        active ? "ring-2 ring-primary ring-inset" : "hover:-translate-y-1",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      aria-pressed={active}
      {...rest}
    >
      <span
        className={clsx(
          "flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2",
          active && "bg-primary/20"
        )}
      >
        {icon}
      </span>
      <span className="text-xs font-medium text-center text-text-primary truncate">
        {label}
      </span>
    </Card>
  );
}
