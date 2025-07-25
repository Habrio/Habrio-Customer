// File: src/components/organisms/PaymentMethodSelector.jsx
import React from 'react';
import clsx from 'clsx';
import { Heading, BodyText } from '../atoms/Typography';
import Button from '../atoms/Button';

/**
 * PaymentMethodSelector organism
 * Props:
 * - methods: Array<{ key: string, label: string, selected: boolean }>
 * - onSelect: function(methodKey)
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export default function PaymentMethodSelector({ methods = [], onSelect, className = '', ...rest }) {
  return (
    <div className={clsx('space-y-3', className)} {...rest}>
      {methods.map((method) => (
        <button
          key={method.key}
          type="button"
          onClick={() => onSelect?.(method.key)}
          className={clsx(
            'w-full flex items-center justify-between p-4 rounded-md border transition',
            method.selected
              ? 'border-primary bg-primary/10'
              : 'border-divider bg-background-soft hover:border-primary',
          )}
        >
          <div className="flex items-center gap-3">
            {/* You can replace with an icon based on method.key */}
            <BodyText size="md" className="text-text-primary">
              {method.label}
            </BodyText>
          </div>
          <div>
            {method.selected && (
              <span className="text-primary font-semibold">Selected</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
