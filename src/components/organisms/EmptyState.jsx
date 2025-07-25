// File: src/components/organisms/EmptyState.jsx
import React from 'react';
import clsx from 'clsx';
import Icon from '../atoms/Icon';
import { Heading, BodyText } from '../atoms/Typography';
import Button from '../atoms/Button';

/**
 * EmptyState organism
 * Props:
 * - icon: ReactNode (optional)
 * - title: string
 * - description: string (optional)
 * - actionLabel: string (optional button text)
 * - onAction: function (optional button click handler)
 * - className: additional Tailwind utility classes
 */
export default function EmptyState({
  icon,
  title = 'Nothing Here',
  description = '',
  actionLabel,
  onAction,
  className = '',
  ...rest
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center px-6 py-12 bg-background',
        className
      )}
      {...rest}
    >
      {icon && (
        <div className="mb-4 text-primary text-6xl">
          <Icon className="w-12 h-12">{icon}</Icon>
        </div>
      )}
      <Heading level={3} className="mb-2 text-text-primary">
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
