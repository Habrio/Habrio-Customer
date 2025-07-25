// File: src/components/organisms/TabSelector.jsx

import React from "react";
import clsx from "clsx";

/**
 * TabSelector organism
 * Props:
 * - tabs: Array<string | { label: string, value: any }> (tab definitions)
 * - value: current selected value
 * - onChange: function(newValue)
 * - className: additional Tailwind utility classes
 */
export default function TabSelector({ tabs = [], value, onChange, className = "" }) {
  // Normalize tabs to objects with label and value
  const items = tabs.map((t) =>
    typeof t === "object" ? { label: t.label, value: t.value } : { label: t, value: t }
  );

  return (
    <div className={clsx("flex gap-2 overflow-x-auto pb-1", className)} role="tablist">
      {items.map(({ label, value: tabValue }) => {
        const selected = value === tabValue;
        return (
          <button
            key={tabValue}
            type="button"
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition focus:outline-none",
              selected
                ? "bg-primary text-white shadow-card"
                : "bg-background-soft text-text-primary border border-divider"
            )}
            aria-selected={selected}
            aria-current={selected ? "page" : undefined}
            onClick={() => onChange?.(tabValue)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}