import React from 'react';
export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 mb-4 ${className}`}
      {...props}
    />
  );
}
