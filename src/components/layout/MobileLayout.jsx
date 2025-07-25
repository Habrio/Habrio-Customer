// src/components/layout/MobileLayout.jsx
import React from 'react';

export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-background-default flex justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
