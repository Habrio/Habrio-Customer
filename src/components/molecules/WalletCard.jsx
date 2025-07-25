// src/components/molecules/WalletCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import Icon from "../atoms/Icon";

/**
 * WalletCard molecule
 * Props:
 * - amount: string/number (main balance/value)
 * - label: string (e.g. "Wallet Balance")
 * - icon: ReactNode (optional, left side or top)
 * - color: 'primary' | 'accent' | 'gradient' | custom (bg color)
 * - info: string (optional extra info, e.g. "Expiring soon")
 * - cta: string (call to action, e.g. "Add Money")
 * - onCta: function (on click CTA)
 * - className: extra classes
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
  // Color map
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
      {/* Optional icon (wallet/cashback) */}
      {icon && (
        <span className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full mr-2">
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        {/* Label and amount */}
        <div className="text-xs opacity-90">{label}</div>
        <div className="text-2xl font-bold leading-tight">{amount}</div>
        {info && (
          <div className="text-xs opacity-80 mt-1">{info}</div>
        )}
      </div>
      {/* CTA Button */}
      {cta && (
        <button
          type="button"
          onClick={onCta}
          className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-white/80 text-primary shadow hover:bg-white transition"
        >
          {cta}
        </button>
      )}
    </Card>
  );
}
