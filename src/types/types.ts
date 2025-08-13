import type { CartItem, Totals } from "../interfaces/cartInterface";

export type cartSiderbar = {
  isOpen: boolean;
  onClose?: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onApplyDiscount: (code: string) => void;
  onCheckout: () => void;
  discountCode: string;
  discountAmount: number;
  totals: Totals;
  isLoading: boolean;
  errors: string[];
  onUndo: () => void;
  clearErrors: () => void;
};

export type cartSummary = {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
};
