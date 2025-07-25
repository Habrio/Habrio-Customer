// File: src/components/layout/ScreenContainer.jsx
import React from 'react';

export default function ScreenContainer({ children, className = '' }) {
  return (
    <div className={`px-4 py-2 ${className}`}>
      {children}
    </div>
  );
}
