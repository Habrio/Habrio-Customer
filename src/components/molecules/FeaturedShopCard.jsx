// File: src/components/molecules/FeaturedShopCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import Avatar from "../atoms/Avatar";
import Badge from "../atoms/Badge";

/**
 * FeaturedShopCard molecule
 * Props:
 * - image: string (shop logo or photo URL)
 * - name: string (shop name)
 * - category: string
 * - status: 'open' | 'closed'
 * - badge: string (optional badge text)
 * - onClick: function (optional click handler)
 * - className: additional Tailwind utility classes
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
        "flex flex-col items-center w-40 min-w-[160px] max-w-[180px] transition group",
        "hover:shadow-elevated hover:-translate-y-1 active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      <Avatar
        src={image}
        alt={name}
        size="lg"
        className="mb-2"
      />

      {badge && (
        <Badge
          intent="info"
          pill
          className="absolute top-2 left-2 z-10"
        >
          {badge}
        </Badge>
      )}

      <div className="text-base font-medium text-text-primary text-center truncate w-full">
        {name}
      </div>
      <div className="text-sm text-text-secondary mt-1 mb-2 text-center truncate w-full">
        {category}
      </div>

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
