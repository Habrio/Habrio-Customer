// src/components/molecules/NearbyShopCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import Avatar from "../atoms/Avatar";
import Badge from "../atoms/Badge";

/**
 * NearbyShopCard molecule
 * Props:
 * - image: url (shop logo or photo)
 * - name: string (shop name)
 * - category: string (e.g. "Pharmacy")
 * - address: string (optional)
 * - status: "open" | "closed"
 * - delivers: boolean (shows “Delivers” badge)
 * - distance: string/number (e.g. "400m", optional)
 * - onClick: function (for navigation)
 * - className: extra classes
 */
export default function NearbyShopCard({
  image,
  name,
  category,
  address,
  status = "open",
  delivers = false,
  distance,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <Card
      variant="outlined"
      padding="md"
      clickable={!!onClick}
      className={clsx(
        "flex items-center gap-4 transition group min-h-[76px]",
        "hover:shadow-elevated hover:-translate-y-0.5 active:scale-[0.99]",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {/* Shop avatar or photo */}
      <Avatar src={image} alt={name} size="md" />

      <div className="flex-1 min-w-0">
        {/* Shop name and “Delivers” badge */}
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold text-text-primary truncate">
            {name}
          </span>
          {delivers && (
            <Badge intent="success" size="sm" pill className="ml-2">
              Delivers
            </Badge>
          )}
        </div>
        {/* Category + Address */}
        <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-text-secondary">
          <span className="truncate">{category}</span>
          {address && (
            <>
              <span className="mx-1">•</span>
              <span className="truncate">{address}</span>
            </>
          )}
        </div>
        {/* Optional distance */}
        {distance && (
          <div className="text-xs text-text-secondary mt-0.5">
            {distance}
          </div>
        )}
      </div>

      {/* Status badge (Open/Closed) */}
      <Badge
        intent={status === "open" ? "success" : "error"}
        size="sm"
        pill
        className="ml-2 shrink-0"
      >
        {status === "open" ? "Open" : "Closed"}
      </Badge>
    </Card>
  );
}
