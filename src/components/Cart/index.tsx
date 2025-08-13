import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { CartSidebar } from "./CartSidebar";
import { ProductGrid } from "./ProductGrid";
import { sampleProducts } from "../../data/product";

export function ShoppingCart() {
  const { state, dispatch, optimisticDispatch } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(item: (typeof sampleProducts)[0]) {
    optimisticDispatch({ type: "ADD_ITEM", item });
    setCartOpen(true);
  }

  function updateQuantity(id: string, qty: number) {
    optimisticDispatch({ type: "UPDATE_QUANTITY", id, quantity: qty });
  }

  function removeItem(id: string) {
    optimisticDispatch({ type: "REMOVE_ITEM", id });
  }

  function applyDiscount(code: string) {
    dispatch({ type: "APPLY_DISCOUNT", code, amount: 0 });
  }

  function handleCheckout() {
    alert("Checkout not implemented. This is a demo.");
  }

  function onUndo() {
    dispatch({ type: "UNDO" });
  }

  function clearErrors() {
    dispatch({ type: "CLEAR_ERRORS" });
  }

  return (
    <>
      <button
        onClick={() => setCartOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Cart ({state.items.length})
      </button>

      <ProductGrid products={sampleProducts} onAddToCart={addToCart} />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={state.items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onApplyDiscount={applyDiscount}
        onCheckout={handleCheckout}
        discountCode={state.discountCode}
        discountAmount={state.discountAmount}
        totals={state.totals}
        isLoading={state.isLoading}
        errors={state.errors}
        onUndo={onUndo}
        clearErrors={clearErrors}
      />
    </>
  );
}
