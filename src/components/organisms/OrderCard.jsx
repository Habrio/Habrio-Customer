// src/components/organisms/OrderCard.jsx

import React from "react";

/**
 * OrderCard
 * Props:
 *   order: {
 *     order_id,
 *     shop_name,
 *     shop_type,
 *     status,
 *     total_amount,
 *     created_at,
 *     item_count,
 *     items: [],
 *   }
 *   onClick: () => void  (optional)
 */
const statusConfig = {
  pending:    { label: "Pending",    icon: "⏳", color: "text-yellow-500" },
  accepted:   { label: "Accepted",   icon: "✅", color: "text-blue-500" },
  confirmed:  { label: "Confirmed",  icon: "📦", color: "text-blue-600" },
  delivered:  { label: "Delivered",  icon: "🎉", color: "text-green-600" },
  cancelled:  { label: "Cancelled",  icon: "❌", color: "text-red-500" },
  default:    { label: "Unknown",    icon: "📋", color: "text-gray-400" }
};

export default function OrderCard({ order, onClick }) {
  const {
    order_id,
    shop_name,
    shop_type,
    status,
    total_amount,
    created_at,
    item_count,
    items = [],
  } = order || {};

  const statusInfo = statusConfig[status] || statusConfig.default;

  return (
    <div
      className="bg-background-soft border border-divider rounded-xl p-4 flex gap-4 shadow-sm cursor-pointer transition hover:shadow-md"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Order ${order_id} from ${shop_name}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className={`text-2xl ${statusInfo.color}`}>{statusInfo.icon}</div>
        <span className="text-xs mt-1 font-semibold capitalize">{statusInfo.label}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base truncate">{shop_name || "Shop"}</h3>
          <span className="text-xs text-text-secondary ml-2">#{order_id}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-text-secondary capitalize">{shop_type}</span>
          <span className="text-xs text-text-secondary">
            {item_count || (items?.length ?? 0)} item{(item_count ?? items?.length) > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="text-lg font-bold text-primary">₹{parseFloat(total_amount).toFixed(2)}</span>
          <span className="text-xs text-text-tertiary">
            {created_at
              ? new Date(created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
