// File: src/components/organisms/BillSummarySection.jsx
import React from 'react';
import clsx from 'clsx';
import { BodyText } from '../atoms/Typography';
import Button from '../atoms/Button';

/**
 * BillSummarySection organism
 * Props:
 * - title: string (optional section title)
 * - items: Array<{ label: string; amount: number; isDiscount?: boolean; isFree?: boolean }>
 * - totalLabel: string (label for total, default 'Total')
 * - totalAmount: number
 * - currencySymbol: string (e.g. '₹')
 * - note: string (optional footnote)
 * - actionLabel: string (optional CTA text)
 * - onAction: function (CTA click handler)
 * - className: additional Tailwind utility classes
 */
export default function BillSummarySection({
  title,
  items = [],
  totalLabel = 'Total',
  totalAmount,
  currencySymbol = '₹',
  note,
  actionLabel,
  onAction,
  className = '',
  ...rest
}) {
  return (
    <section
      className={clsx(
        'bg-background-soft border border-divider rounded-lg p-4',
        className
      )}
      {...rest}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-text-primary">
          {title}
        </h3>
      )}

      <div className="space-y-2">
        {items.map(({ label, amount, isDiscount, isFree }, idx) => {
          let display;
          let valueClass = 'text-base';
          if (isFree) {
            display = 'FREE';
            valueClass += ' text-success font-medium';
          } else if (isDiscount) {
            display = `- ${currencySymbol}${Math.abs(amount)}`;
            valueClass += ' text-success';
          } else {
            display = `${currencySymbol}${amount}`;
          }
          return (
            <div key={idx} className="flex justify-between">
              <BodyText size="md" className="text-text-primary">
                {label}
              </BodyText>
              <BodyText size="md" className={valueClass}>
                {display}
              </BodyText>
            </div>
          );
        })}
      </div>

      <div className="border-t border-divider pt-3 mt-3 flex justify-between">
        <BodyText size="lg" className="font-semibold text-text-primary">
          {totalLabel}
        </BodyText>
        <BodyText size="lg" className="font-semibold text-primary">
          {currencySymbol}{totalAmount}
        </BodyText>
      </div>

      {note && (
        <BodyText size="sm" color="secondary" className="mt-2">
          {note}
        </BodyText>
      )}

      {actionLabel && onAction && (
        <div className="mt-4">
          <Button fullWidth onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
