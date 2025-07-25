// src/components/molecules/SectionCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * SectionCard molecule
 * Props:
 * - title: string or node (section title)
 * - subtitle: string or node (optional subtext)
 * - action: node (optional action button/icon)
 * - children: section content
 * - variant: Card variant (default, outlined, soft, error, etc.)
 * - padding: Card padding ("sm", "md", "lg", or false)
 * - className: extra classes
 * - ...rest
 */
export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...rest
}) {
  return (
    <Card
      variant={variant}
      padding={padding}
      className={clsx("w-full", className)}
      {...rest}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between mb-3 gap-2">
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
          {action && (
            <div className="shrink-0">{action}</div>
          )}
        </div>
      )}
      <div>{children}</div>
    </Card>
  );
}
