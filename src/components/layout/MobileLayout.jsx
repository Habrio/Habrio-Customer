// File: src/components/layout/MobileLayout.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * MobileLayout
 *
 * A top‑level layout component for mobile screens:
 * - Centers content horizontally
 * - Enforces a max-width (e.g. 375px)
 * - Applies safe-area padding (for notches)
 * - Sets a neutral background and full‑height
 *
 * Props:
 * - children: ReactNode
 * - className: string (additional classes on the inner container)
 */
export default function MobileLayout({ children, className = '' }) {
  return (
    <div className="min-h-screen bg-[var(--background)] safe-top safe-bottom flex justify-center">
      <div className={clsx('w-full max-w-[375px]', className)}>
        {children}
      </div>
    </div>
  );
}
