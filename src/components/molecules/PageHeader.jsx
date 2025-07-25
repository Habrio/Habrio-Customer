// src/components/molecules/PageHeader.jsx
import React from "react";
import clsx from "clsx";
import Icon from "../atoms/Icon";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * PageHeader molecule
 * Props:
 * - title: string or node
 * - subtitle: string or node (optional)
 * - back: function (if provided, shows back arrow)
 * - action: node (right-side button/icon/avatar)
 * - sticky: boolean (makes header sticky at top)
 * - className: string
 * - ...rest
 */
export default function PageHeader({
  title,
  subtitle,
  back,
  action,
  sticky = true,
  className = "",
  ...rest
}) {
  return (
    <header
      className={clsx(
        "w-full z-20 bg-background",
        sticky && "sticky top-0",
        "flex items-center min-h-[56px] px-4 md:px-8 py-2 border-b border-divider",
        className
      )}
      {...rest}
    >
      {/* Back button */}
      {back && (
        <button
          type="button"
          aria-label="Back"
          onClick={back}
          className="mr-3 flex items-center justify-center rounded-full w-9 h-9 hover:bg-background-soft focus:outline-none"
        >
          <Icon name="chevron-left" size={22} className="text-text-primary" />
        </button>
      )}

      {/* Title and subtitle */}
      <div className={clsx(
        "flex-1 min-w-0",
        (subtitle || action) && "flex flex-col"
      )}>
        <Heading level={2} className="truncate">{title}</Heading>
        {subtitle && (
          <BodyText size="sm" color="secondary" className="truncate mt-0.5">
            {subtitle}
          </BodyText>
        )}
      </div>

      {/* Action (icon, button, avatar, etc.) */}
      {action && (
        <div className="ml-3 flex-shrink-0">{action}</div>
      )}
    </header>
  );
}
