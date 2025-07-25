// File: src/components/organisms/BillSummarySection.jsx
import React from 'react';
import clsx from 'clsx';
import { BodyText } from '../atoms/Typography';
import Button from '../atoms/Button';

/**
 * BillSummarySection organism
 *
 * Props:
 * - title: string                // Optional section title
 * - items: Array<{              // Line-item array
 *     label: string,
 *     amount: number,
 *     isDiscount?: boolean,      // true for discount/savings rows
 *     isFree?: boolean           // true to display 'FREE' (e.g., delivery)
 *   }>
 * - totalLabel: string           // Label for total row (default "Total")
 * - totalAmount: number          // Total amount
 * - currencySymbol: string       // e.g. "₹"
 * - note: string                 // Optional footnote (e.g. "Taxes included")
 * - actionLabel: string          // Optional CTA text (e.g. "Pay Now")
 * - onAction: () => void         // CTA click handler
 * - className: string
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
}) {
  return (
    <section
      className={clsx(
        'bg-[var(--background-soft)] border border-[var(--divider)] rounded-lg p-4',
        className
      )}
      aria-label={title || 'Bill Summary'}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4">
          {title}
        </h3>
      )}

      <div className="space-y-2">
        {items.map(({ label, amount, isDiscount, isFree }, idx) => {
          let display;
          let valueClass = 'text-sm';
          if (isFree) {
            display = 'FREE';
            valueClass += ' text-[var(--success-color)] font-medium';
          } else if (isDiscount) {
            display = `- ${currencySymbol}${Math.abs(amount)}`;
            valueClass += ' text-[var(--success-color)]';
          } else {
            display = `${currencySymbol}${amount}`;
          }
          return (
            <div key={idx} className="flex justify-between">
              <BodyText size="sm">{label}</BodyText>
              <BodyText size="sm" className={valueClass}>
                {display}
              </BodyText>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--divider)] pt-3 mt-3 flex justify-between">
        <BodyText size="md" className="font-semibold">
          {totalLabel}
        </BodyText>
        <BodyText size="md" className="font-semibold text-[var(--primary-color)]">
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
          <Button className="w-full" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
