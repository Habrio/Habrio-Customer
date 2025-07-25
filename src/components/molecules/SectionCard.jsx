// File: src/components/molecules/SectionCard.jsx
import React from "react";
import clsx from "clsx";
import Card from "./Card";
import { Heading, BodyText } from "../atoms/Typography";

/**
 * SectionCard molecule
 * Props:
 * - title: string or ReactNode (optional section title)
 * - subtitle: string or ReactNode (optional subtitle)
 * - action: ReactNode (optional action button/icon)
 * - children: ReactNode (section content)
 * - variant: 'default' | 'outlined' | 'soft' | 'error' | 'success'
 * - padding: 'sm' | 'md' | 'lg' | false
 * - className: additional Tailwind utility classes
 * - ...rest: other props
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
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </Card>
  );
}
