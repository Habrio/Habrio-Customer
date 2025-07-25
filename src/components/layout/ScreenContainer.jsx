// File: src/components/layout/ScreenContainer.jsx
import React from 'react';
import clsx from 'clsx';

export default function ScreenContainer({
  children,
  className = '',
  ...rest
}) {
  return (
    <div
      className={clsx('px-4 py-2', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
