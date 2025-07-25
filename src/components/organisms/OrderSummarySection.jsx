import React from 'react';
import { Heading, BodyText } from '../atoms/Typography';

export default function OrderSummarySection({ items, totalAmount, deliveryCharges, finalAmount }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <Heading size="md">Order Summary</Heading>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <BodyText className="font-medium">{item.name} × {item.quantity}</BodyText>
            <BodyText className="font-medium">₹{item.subtotal}</BodyText>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 space-y-1">
        <div className="flex justify-between">
          <BodyText>Subtotal</BodyText>
          <BodyText>₹{totalAmount}</BodyText>
        </div>
        <div className="flex justify-between">
          <BodyText>Delivery Charges</BodyText>
          <BodyText>₹{deliveryCharges}</BodyText>
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <Heading size="sm">Total</Heading>
        <Heading size="sm" className="text-primary">₹{finalAmount}</Heading>
      </div>
    </div>
  );
}
