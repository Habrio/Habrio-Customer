// src/components/organisms/BottomNav.jsx
import React from "react";
import clsx from "clsx";
import Icon from "../atoms/Icon";
import Badge from "../atoms/Badge";

// Tab config array makes this scalable!
const TABS = [
  { key: "home", label: "Home", icon: "home", route: "/" },
  { key: "shops", label: "Shops", icon: "store", route: "/shops" },
  { key: "orders", label: "Orders", icon: "clipboard-list", route: "/orders" },
  { key: "cart", label: "Cart", icon: "shopping-cart", route: "/cart", badgeKey: "cartCount" },
  { key: "profile", label: "Profile", icon: "user", route: "/profile" },
];

/**
 * BottomNav organism
 * Props:
 * - active: string (active tab key)
 * - badgeData: object { [badgeKey]: number }
 * - onNavigate: function(tab.route)
 * - className: extra Tailwind classes
 */
export default function BottomNav({
  active = "home",
  badgeData = {},
  onNavigate,
  className = "",
  ...rest
}) {
  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-divider shadow-card",
        "flex justify-between items-center h-16 px-2 md:hidden",
        "transition-all",
        "safe-bottom",
        className
      )}
      aria-label="Main Navigation"
      {...rest}
    >
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          aria-label={tab.label}
          aria-current={active === tab.key ? "page" : undefined}
          className={clsx(
            "flex flex-col items-center justify-center flex-1 h-full outline-none transition",
            active === tab.key
              ? "text-primary font-bold"
              : "text-text-secondary font-medium hover:text-primary"
          )}
          onClick={() => onNavigate?.(tab.route, tab.key)}
        >
          <span className="relative">
            <Icon name={tab.icon} size={24} />
            {/* Badge support (e.g., cart count) */}
            {tab.badgeKey && badgeData[tab.badgeKey] > 0 && (
              <span className="absolute -top-2 -right-2">
                <Badge intent="error" size="sm" pill>
                  {badgeData[tab.badgeKey]}
                </Badge>
              </span>
            )}
          </span>
          <span className="text-xs mt-1 leading-none">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
