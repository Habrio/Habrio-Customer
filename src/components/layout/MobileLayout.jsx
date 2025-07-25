// File: src/components/layout/MobileLayout.jsx
import React from 'react';

export default function MobileLayout({ children }) {
  return (
    <div className="
        min-h-screen           /* full viewport height */
        bg-background          /* your default background color */
        flex                   /* flex container */
        justify-center         /* center horizontally */
        items-center           /* center vertically */
      ">
      <div className="w-full max-w-md h-full">
        {children}
      </div>
    </div>
  );
}
