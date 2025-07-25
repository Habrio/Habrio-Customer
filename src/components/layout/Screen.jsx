import React from 'react';

export default function Screen({ children, className = '' }) {
  return (
    <div className={`p-6 bg-white flex flex-col flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
