// File: src/components/organisms/OrderCard.jsx

import React from "react";
import clsx from "clsx";

/**
 * OrderCard organism
 * Props:
 * - order: {
 *     order_id: string | number,
 *     shop_name: string,
 *     shop_type: string,
 *     status: string,
 *     total_amount: number | string,
 *     created_at: string (ISO date),
 *     item_count: number,
 *     items?: Array,
 *   }
 * - onClick: function (optional click handler)
 */

const STATUS_CONFIG = {
  pending:    { label: "Pending",    icon: "⏳", color: "text-warning" },
  accepted:   { label: "Accepted",   icon: "✅", color: "text-info" },
  confirmed:  { label: "Confirmed",  icon: "📦", color: "text-info" },
  delivered:  { label: "Delivered",  icon: "🎉", color: "text-success" },
  cancelled:  { label: "Cancelled",  icon: "❌", color: "text-error" },
  default:    { label: "Unknown",    icon: "📋", color: "text-text-secondary" },
};

export default function OrderCard({ order = {}, onClick }) {
  const {
    order_id,
    shop_name,
    shop_type,
    status,
    total_amount,
    created_at,
    item_count,
    items,
  } = order;

  const statusKey = STATUS_CONFIG[status] ? status : 'default';
  const { label, icon, color } = STATUS_CONFIG[statusKey];

  return (
    <div
      className={clsx(
        "bg-background-soft border border-divider rounded-lg p-4 flex gap-4 shadow-card transition hover:shadow-elevated cursor-pointer",
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Status icon and label */}
      <div className="flex flex-col items-center justify-center">
        <span className={clsx("text-2xl", color)}>{icon}</span>
        <span className="text-xs font-semibold capitalize mt-1">{label}</span>
      </div>

      {/* Order details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base truncate text-text-primary">{shop_name || 'Shop'}</h3>
          <span className="text-xs text-text-secondary ml-2">#{order_id}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-text-secondary capitalize">{shop_type}</span>
          <span className="text-xs text-text-secondary">
            {item_count || (items?.length ?? 0)} item{(item_count ?? items?.length) > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="text-lg font-bold text-primary">₹{parseFloat(total_amount).toFixed(2)}</span>
          {created_at && (
            <span className="text-xs text-text-secondary">
              {new Date(created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
