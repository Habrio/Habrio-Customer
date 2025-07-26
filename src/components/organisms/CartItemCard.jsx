// File: src/components/organisms/CartItemCard.jsx
import React from 'react';
import clsx from 'clsx';
import Button from '../atoms/Button';
import { Heading, BodyText } from '../atoms/Typography';
import Badge from '../atoms/Badge';

// Default currency symbol used for price display
const currencySymbol = '₹';

/**
 * CartItemCard organism
 * Props:
 * - item: {
 *     id: string | number,
 *     image_url?: string,
 *     title: string,
 *     brand?: string,
 *     pack_size?: string,
 *     unit?: string,
 *     price: number,
 *     mrp?: number,
 *     quantity: number
 *   }
 * - onRemove: function(itemId)
 * - onUpdateQuantity: function(itemId, newQuantity)
 * - className: additional Tailwind utility classes
 * - ...rest: other props
 */
export default function CartItemCard({ item, onRemove, onUpdateQuantity, className = '', ...rest }) {
  const {
    id,
    image_url,
    title,
    brand,
    pack_size,
    unit,
    price,
    mrp,
    quantity
  } = item;

  // Calculate discount percentage if applicable
  const discountPercent = mrp && mrp > price
    ? Math.round(((mrp - price) / mrp) * 100)
    : 0;

  return (
    <div
      className={clsx(
        'flex items-center bg-background-soft shadow-card rounded-lg p-4 gap-4',
        className
      )}
      {...rest}
    >
      {/* Item Image */}
      <div className="w-20 h-20 bg-divider/40 rounded-md overflow-hidden flex items-center justify-center">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-2xl text-text-secondary">📦</span>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <Heading level={4} className="text-text-primary truncate">
          {title}
        </Heading>
        <BodyText size="sm" color="secondary" className="truncate">
          {brand && `${brand} • `}{pack_size} {unit}
        </BodyText>
        <div className="flex items-center gap-2 mt-1">
          <BodyText size="md" className="font-semibold text-primary">
            {currencySymbol}{price}
          </BodyText>
          {discountPercent > 0 && (
            <>
              <BodyText size="sm" className="line-through text-text-secondary">
                {currencySymbol}{mrp}
              </BodyText>
              <Badge intent="success" size="sm" pill>
                {discountPercent}% OFF
              </Badge>
            </>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <BodyText className="px-2 font-medium">{quantity}</BodyText>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="text-error text-sm ml-2 focus:outline-none"
      >
        Remove
      </button>
    </div>
  );
}
