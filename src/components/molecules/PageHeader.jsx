// File: src/components/molecules/PageHeader.jsx
import React from "react";
import clsx from "clsx";
import Icon from "../atoms/Icon";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * PageHeader molecule
 * Props:
 * - title: string or ReactNode
 * - subtitle: string or ReactNode (optional)
 * - back: function (optional, shows back arrow)
 * - action: ReactNode (optional, right-side element)
 * - sticky: boolean (default true, makes header sticky)
 * - className: additional Tailwind utility classes
 * - ...rest: other props
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
        "w-full z-20 bg-background border-b border-divider",
        sticky && "sticky top-0",
        "flex items-center min-h-14 px-4 py-2",
        className
      )}
      {...rest}
    >
      {back && (
        <button
          type="button"
          onClick={back}
          aria-label="Back"
          className="mr-3 flex items-center justify-center w-9 h-9 rounded-md hover:bg-background-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Icon name="chevron-left" size={22} />
        </button>
      )}

      <div className={clsx("flex-1 min-w-0", (subtitle || action) && "flex flex-col")}>
        <Heading level={2} className="truncate">
          {title}
        </Heading>
        {subtitle && (
          <BodyText size="sm" color="secondary" className="truncate mt-0.5">
            {subtitle}
          </BodyText>
        )}
      </div>

      {action && <div className="ml-3 flex-shrink-0">{action}</div>}
    </header>
  );
}
