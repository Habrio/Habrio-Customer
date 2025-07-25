// src/components/organisms/TabSelector.jsx

import React from "react";

/**
 * TabSelector
 * Props:
 *   tabs: string[] | { label, value }[]     // Array of tab labels or objects
 *   value: string | number                  // Currently selected value
 *   onChange: (value) => void               // Callback when tab changes
 *   className: string (optional)
 */
export default function TabSelector({
  tabs = [],
  value,
  onChange,
  className = "",
}) {
  // Support both string and object array
  const getTabProps = (tab) =>
    typeof tab === "object"
      ? { label: tab.label, value: tab.value }
      : { label: tab, value: tab };

  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-1 ${className}`}
      role="tablist"
    >
      {tabs.map((tab, idx) => {
        const { label, value: tabValue } = getTabProps(tab);
        const selected = value === tabValue;
        return (
          <button
            key={tabValue ?? idx}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                selected
                  ? "bg-primary text-white shadow"
                  : "bg-background-soft text-text-primary border border-divider"
              }
              focus:outline-none focus:ring-2 focus:ring-primary/60`}
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
