import React from 'react';
import { BodyText, Heading } from '../atoms/Typography';
import Button from '../atoms/Button';

export default function CartItemCard({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center bg-white shadow-sm rounded-lg p-4 gap-4">
      {/* Item Image */}
      <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center text-2xl">📦</div>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1">
        <Heading size="sm" className="text-gray-800">{item.title}</Heading>
        <BodyText className="text-gray-500">
          {item.brand && `${item.brand} • `}
          {item.pack_size} {item.unit}
        </BodyText>
        <div className="flex items-center gap-2 mt-1">
          <Heading size="sm" className="text-primary">₹{item.price}</Heading>
          {item.mrp && item.mrp > item.price && (
            <>
              <span className="text-gray-400 line-through text-sm">₹{item.mrp}</span>
              <span className="text-green-500 text-xs font-medium">
                {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
            -
          </Button>
          <span className="px-2 font-medium">{item.quantity}</span>
          <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        className="text-red-500 text-sm"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
