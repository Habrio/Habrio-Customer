// src/components/molecules/FeaturedShopCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import Avatar from "../atoms/Avatar";
import Badge from "../atoms/Badge";

/**
 * FeaturedShopCard molecule
 * Props:
 * - image: url (shop logo or photo)
 * - name: string (shop name)
 * - category: string (e.g. "Groceries")
 * - status: "open" | "closed"
 * - onClick: function (for navigation)
 * - badge: string (e.g. "Featured", optional)
 * - className: extra classes
 */
export default function FeaturedShopCard({
  image,
  name,
  category,
  status = "open",
  badge,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <Card
      variant="outlined"
      padding="sm"
      clickable={!!onClick}
      className={clsx(
        "flex flex-col items-center w-40 min-w-[160px] max-w-[180px] transition relative group",
        "hover:shadow-elevated hover:-translate-y-1 active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {/* Shop avatar or photo */}
      <Avatar
        src={image}
        alt={name}
        size="lg"
        className="mb-2"
      />

      {/* Badge for “Featured” */}
      {badge && (
        <Badge intent="info" pill className="absolute top-2 left-2 z-10">
          {badge}
        </Badge>
      )}

      {/* Shop name */}
      <div className="text-sm font-semibold text-text-primary text-center truncate w-full">
        {name}
      </div>
      {/* Category */}
      <div className="text-xs text-text-secondary mt-1 mb-2 text-center truncate w-full">
        {category}
      </div>

      {/* Shop status */}
      <Badge
        intent={status === "open" ? "success" : "error"}
        size="sm"
        pill
        className="mt-auto"
      >
        {status === "open" ? "Open" : "Closed"}
      </Badge>
    </Card>
  );
}
