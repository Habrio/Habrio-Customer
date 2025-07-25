// File: src/components/molecules/Card.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * Card molecule
 * Props:
 * - children: content
 * - variant: 'default' | 'outlined' | 'soft' | 'error' | 'success'
 * - padding: 'sm' | 'md' | 'lg' | false
 * - clickable: boolean
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
const VARIANT_CLASSES = {
  default: 'bg-background-soft shadow-card',
  outlined: 'bg-background border border-divider',
  soft: 'bg-primary/5',
  error: 'bg-error/10 border border-error',
  success: 'bg-accent/10 border border-accent',
};

const PADDING_CLASSES = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
  false: '',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  clickable = false,
  className = '',
  ...rest
}) {
  return (
    <div
      className={clsx(
        'rounded-lg transition group',
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        clickable && 'hover:shadow-elevated cursor-pointer active:scale-[0.98]',
        className
      )}
      tabIndex={clickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
