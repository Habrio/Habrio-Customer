// File: src/components/layout/MobileLayout.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * MobileLayout wrapper
 * Centers content on mobile devices, ensures proper padding for bottom nav
 * Props:
 * - children: page content
 * - className: additional Tailwind utility classes
 */
export default function MobileLayout({ children, className = '' }) {
  return (
    <div
      className={clsx(
        'min-h-screen bg-background flex justify-center items-start',
        'pt-4 pb-20', // top padding and bottom padding for fixed bottom nav
        className
      )}
    >
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
