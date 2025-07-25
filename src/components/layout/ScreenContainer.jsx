// File: src/components/layout/ScreenContainer.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * ScreenContainer wrapper
 * Provides consistent horizontal padding and vertical spacing
 * Props:
 * - children: inner content
 * - className: additional Tailwind utility classes
 * - ...rest: other props (e.g., id, aria-label)
 */
export default function ScreenContainer({ children, className = '', ...rest }) {
  return (
    <div
      className={clsx(
        'px-4 py-4', // consistent padding from design system (16px = p-4)
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}