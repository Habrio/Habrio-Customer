// File: src/components/organisms/EmptyState.jsx
import React from 'react';
import clsx from 'clsx';
import Icon from '../atoms/Icon';
import { Heading, BodyText } from '../atoms/Typography';
import Button from '../atoms/Button';

/**
 * EmptyState organism
 *
 * Renders a friendly “nothing here” view for empty lists, errors, or no-data screens.
 *
 * Props:
 * - icon: ReactNode         // Optional icon or SVG to display
 * - title: string           // Primary headline (e.g. “No Shops Found”)
 * - description: string     // Secondary text explaining the empty state
 * - actionLabel: string     // Optional call-to-action button text
 * - onAction: function      // Handler when CTA button is clicked
 * - className: string       // Additional container classes
 */
export default function EmptyState({
  icon,
  title = 'Nothing Here',
  description = '',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center px-6 py-12',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-primary text-6xl">
          <Icon className="w-12 h-12">{icon}</Icon>
        </div>
      )}
      <Heading level={3} className="mb-2">
        {title}
      </Heading>
      {description && (
        <BodyText size="md" color="secondary" className="mb-6 max-w-xs">
          {description}
        </BodyText>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
