import React, { useEffect, useState } from "react";
import { QuantityInput } from "./QuantityInput";
import { CartSummary } from "./CartSummary";
import type { cartSiderbar } from "../../types/types";

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onApplyDiscount,
  onCheckout,
  discountCode,
  discountAmount,
  totals,
  isLoading,
  errors,
  onUndo,
  clearErrors,
}: cartSiderbar) {
  const [discountInput, setDiscountInput] = useState(discountCode);

  useEffect(() => {
    setDiscountInput(discountCode);
  }, [discountCode]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setDiscountInput(val);
    onApplyDiscount(val); // Real-time discount update
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg flex flex-col z-50">
      <header className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button
          aria-label="Close cart"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          ✕
        </button>
      </header>

      <section className="flex-grow overflow-y-auto p-4 space-y-4">
        {isLoading && (
          <div className="text-blue-600 font-semibold mb-4">Syncing...</div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
            <button
              onClick={clearErrors}
              className="mt-2 underline text-sm text-red-700"
            >
              Clear Errors
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <QuantityInput
                  quantity={item.quantity}
                  onChange={(qty) => onUpdateQuantity(item.id, qty)}
                />
              </div>
              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </section>

      <section className="p-4 border-t space-y-4">
        <input
          type="text"
          placeholder="Discount code"
          value={discountInput}
          onChange={handleDiscountChange}
          className="w-full border rounded px-3 py-2"
        />
        <CartSummary
          subtotal={totals.subtotal}
          tax={totals.tax}
          shipping={totals.shipping}
          discount={discountAmount}
          total={totals.total}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={onUndo}
            disabled={isLoading}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black px-3 py-1 rounded"
          >
            Undo
          </button>
          <button
            onClick={onCheckout}
            disabled={items.length === 0 || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </section>
    </aside>
  );
}
