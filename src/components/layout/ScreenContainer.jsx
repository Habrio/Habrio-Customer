// src/components/layout/ScreenContainer.jsx
import React from 'react';

export default function ScreenContainer({ children }) {
  return (
    <div className="px-4 py-2">
      {children}
    </div>
  );
}
