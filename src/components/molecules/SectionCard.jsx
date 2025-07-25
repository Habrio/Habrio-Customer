import React from 'react';
export default function SectionCard({ children, className = '' }) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}
