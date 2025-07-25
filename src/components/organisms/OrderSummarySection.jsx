// File: src/components/organisms/OrderSummarySection.jsx
import React from 'react';
import clsx from 'clsx';
import { Heading, BodyText } from '../atoms/Typography';

/**
 * OrderSummarySection organism
 * Props:
 * - items: Array<{ id: string|number, name: string, quantity: number, subtotal: number }> 
 * - totalAmount: number
 * - deliveryCharges: number
 * - finalAmount: number
 * - className: string (optional additional classes)
 * - ...rest: other props
 */
export default function OrderSummarySection({ items = [], totalAmount = 0, deliveryCharges = 0, finalAmount = 0, className = '', ...rest }) {
  return (
    <div
      className={clsx(
        'bg-background rounded-lg shadow-card p-4 space-y-4',
        className
      )}
      {...rest}
    >
      <Heading level={3} className="text-text-primary">Order Summary</Heading>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <BodyText size="md" className="text-text-primary">{item.name} × {item.quantity}</BodyText>
            <BodyText size="md" className="text-text-primary">₹{item.subtotal}</BodyText>
          </div>
        ))}
      </div>

      <div className="border-t border-divider pt-3 space-y-1">
        <div className="flex justify-between">
          <BodyText>Subtotal</BodyText>
          <BodyText>₹{totalAmount}</BodyText>
        </div>
        <div className="flex justify-between">
          <BodyText>Delivery Charges</BodyText>
          <BodyText>₹{deliveryCharges}</BodyText>
        </div>
      </div>

      <div className="border-t border-divider pt-3 flex justify-between items-center">
        <Heading level={4} className="text-text-primary">Total</Heading>
        <Heading level={4} className="text-primary">₹{finalAmount}</Heading>
      </div>
    </div>
  );
}
