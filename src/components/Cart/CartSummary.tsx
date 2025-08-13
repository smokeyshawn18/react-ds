import type { cartSummary } from "../../types/types";

export function CartSummary({
  subtotal,
  tax,
  shipping,
  discount,
  total,
}: cartSummary) {
  return (
    <div className="space-y-1 text-right">
      <div>
        <span className="font-semibold">Subtotal:</span> ${subtotal.toFixed(2)}
      </div>
      <div>
        <span className="font-semibold">Tax:</span> ${tax.toFixed(2)}
      </div>
      <div>
        <span className="font-semibold">Shipping:</span> ${shipping.toFixed(2)}
      </div>
      <div>
        <span className="font-semibold">Discount:</span>{" "}
        <span className="text-green-600">-${discount.toFixed(2)}</span>
      </div>
      <div className="text-xl font-bold border-t pt-2">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
