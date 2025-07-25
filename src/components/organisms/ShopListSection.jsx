// File: src/components/organisms/ShopListSection.jsx
import React from "react";
import clsx from "clsx";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * ShopListSection organism
 * Props:
 * - title: string or ReactNode (optional section title)
 * - subtitle: string or ReactNode (optional subtitle)
 * - action: ReactNode (optional action button/link)
 * - horizontal: boolean (carousel style display)
 * - children: ReactNode or array of nodes
 * - empty: ReactNode or string (content when list is empty)
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export default function ShopListSection({
  title,
  subtitle,
  action,
  horizontal = false,
  children,
  empty = "No shops to show.",
  className = "",
  ...rest
}) {
  const isEmpty =
    !children || (Array.isArray(children) && children.length === 0);

  return (
    <section className={clsx("mb-6", className)} {...rest}>
      {(title || subtitle || action) && (
        <div className="flex items-end justify-between mb-3 gap-2">
          <div>
            {title && (
              <Heading level={3} className="mb-0.5 leading-tight">
                {title}
              </Heading>
            )}
            {subtitle && (
              <BodyText size="sm" color="secondary">
                {subtitle}
              </BodyText>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {isEmpty ? (
        typeof empty === "string" ? (
          <BodyText color="secondary" className="text-center py-8">
            {empty}
          </BodyText>
        ) : (
          empty
        )
      ) : horizontal ? (
        <div className="flex gap-4 overflow-x-auto pb-1 -mx-2 px-2 snap-x snap-mandatory">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              className: clsx("snap-center shrink-0", child.props.className),
            })
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}
