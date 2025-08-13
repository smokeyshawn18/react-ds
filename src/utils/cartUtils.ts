import type { CartItem, Totals } from "../interfaces/cartInterface";

export function calculateTotals(
  items: CartItem[],
  discountAmount: number
): Totals {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = Math.max(subtotal + tax + shipping - discountAmount, 0);
  return { subtotal, tax, shipping, total };
}
