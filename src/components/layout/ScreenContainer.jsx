// File: src/components/layout/ScreenContainer.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * ScreenContainer
 *
 * Provides a consistent scrollable content area:
 * - Vertical scrolling
 * - Padding to avoid header and bottom nav overlap
 * - Horizontal padding for content
 *
 * Props:
 * - children: ReactNode
 * - className: string (additional classes on the content wrapper)
 */
export default function ScreenContainer({ children, className = '' }) {
  return (
    <div
      className={clsx(
        'overflow-y-auto pb-[100px] pt-[60px] px-4', 
        className
      )}
    >
      {children}
    </div>
  );
}
