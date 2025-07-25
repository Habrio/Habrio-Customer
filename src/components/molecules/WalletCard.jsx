// File: src/components/molecules/WalletCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import Icon from "../atoms/Icon";

/**
 * WalletCard molecule
 * Props:
 * - amount: string | number
 * - label: string
 * - icon: ReactNode (optional wallet icon)
 * - color: 'primary' | 'accent' | 'gradient' | 'default'
 * - info: string (optional extra info)
 * - cta: string (call-to-action text)
 * - onCta: function (CTA click handler)
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export default function WalletCard({
  amount,
  label,
  icon,
  color = "primary",
  info,
  cta,
  onCta,
  className = "",
  ...rest
}) {
  const colorMap = {
    primary: "bg-primary text-white",
    accent: "bg-accent text-white",
    gradient: "bg-gradient-to-tr from-primary to-accent text-white",
    default: "bg-background-soft text-text-primary",
  };

  return (
    <Card
      variant="default"
      padding="lg"
      className={clsx(
        "flex items-center gap-4 min-h-[88px] relative overflow-hidden",
        colorMap[color] || colorMap.default,
        className
      )}
      {...rest}
    >
      {icon && (
        <span className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full mr-2">
          {icon}
        </span>
      )}

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium opacity-90">{label}</div>
        <div className="text-2xl font-bold leading-tight">{amount}</div>
        {info && <div className="text-sm opacity-80 mt-1">{info}</div>}
      </div>

      {cta && onCta && (
        <button
          type="button"
          onClick={onCta}
          className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-white/80 text-primary shadow-card hover:bg-white transition"
        >
          {cta}
        </button>
      )}
    </Card>
  );
}
