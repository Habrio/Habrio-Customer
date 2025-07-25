// File: src/components/layout/MobileLayout.jsx
import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../organisms/BottomNav';

/**
 * MobileLayout wrapper
 * Centers content on mobile devices, ensures proper padding for bottom nav
 * Props:
 * - children: page content
 * - className: additional Tailwind utility classes
 */
export default function MobileLayout({
  children,
  className = '',
  showNav = false,
  activeTab = 'home',
}) {
  const navigate = useNavigate();

  const paddingY = showNav ? 'pt-4 pb-20' : 'pt-4 pb-4';

  return (
    <div
      className={clsx(
        'min-h-screen bg-background flex justify-center items-start',
        paddingY,
        className
      )}
    >
      <div className="w-full max-w-md px-4">
        {children}
      </div>
      {showNav && (
        <BottomNav
          active={activeTab}
          onNavigate={(route) => navigate(route)}
          className="max-w-md mx-auto"
        />
      )}
    </div>
  );
}
