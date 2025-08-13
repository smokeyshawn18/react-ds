export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Totals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  discountCode: string;
  discountAmount: number;
  totals: Totals;
  isLoading: boolean;
  errors: string[];
  undoStack: CartState[];
}

export type Action =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "APPLY_DISCOUNT"; code: string; amount: number }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "UNDO" }
  | { type: "LOAD_CART"; state: CartState };
