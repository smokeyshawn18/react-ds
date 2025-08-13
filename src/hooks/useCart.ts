import { useReducer, useEffect, useCallback, useRef } from "react";
import type { CartState, Action } from "../interfaces/cartInterface";
import { calculateTotals } from "../utils/cartUtils";

const initialState: CartState = {
  items: [],
  discountCode: "",
  discountAmount: 0,
  totals: { subtotal: 0, tax: 0, shipping: 0, total: 0 },
  isLoading: false,
  errors: [],
  undoStack: [],
};

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "LOAD_CART":
      return { ...action.state };

    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) => i.id === action.item.id
      );
      let updatedItems;
      if (existingIndex !== -1) {
        updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + action.item.quantity,
        };
      } else {
        updatedItems = [...state.items, action.item];
      }
      const totals = calculateTotals(updatedItems, state.discountAmount);
      return {
        ...state,
        undoStack: [state, ...state.undoStack],
        items: updatedItems,
        totals,
        errors: [],
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((i) => i.id !== action.id);
      const totals = calculateTotals(updatedItems, state.discountAmount);
      return {
        ...state,
        undoStack: [state, ...state.undoStack],
        items: updatedItems,
        totals,
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity < 1) return state;
      const updatedItems = state.items.map((i) =>
        i.id === action.id ? { ...i, quantity: action.quantity } : i
      );
      const totals = calculateTotals(updatedItems, state.discountAmount);
      return {
        ...state,
        undoStack: [state, ...state.undoStack],
        items: updatedItems,
        totals,
      };
    }

    case "APPLY_DISCOUNT": {
      const validCodes: Record<string, number> = {
        SAVE10: 10,
        SAVE20: 20,
      };
      if (action.code && validCodes[action.code.toUpperCase()]) {
        const amount = validCodes[action.code.toUpperCase()];
        const totals = calculateTotals(state.items, amount);
        return {
          ...state,
          discountCode: action.code.toUpperCase(),
          discountAmount: amount,
          totals,
          errors: [],
        };
      } else {
        return {
          ...state,
          errors: ["Invalid discount code"],
        };
      }
    }

    case "CLEAR_ERRORS":
      return { ...state, errors: [] };

    case "SET_LOADING":
      return { ...state, isLoading: action.loading };

    case "UNDO": {
      if (state.undoStack.length === 0) return state;
      const [previous, ...rest] = state.undoStack;
      return { ...previous, undoStack: rest };
    }

    default:
      return state;
  }
}

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const syncingRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) dispatch({ type: "LOAD_CART", state: JSON.parse(saved) });
    } catch {
      // Ignore error
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state.items, state.discountCode, state.discountAmount]);

  const optimisticDispatch = useCallback(async (action: Action) => {
    dispatch(action);
    if (syncingRef.current) return;
    syncingRef.current = true;
    dispatch({ type: "SET_LOADING", loading: true });

    await new Promise((r) => setTimeout(r, 800));

    const fail = Math.random() < 0.1;
    if (fail) {
      dispatch({ type: "SET_LOADING", loading: false });
      dispatch({ type: "CLEAR_ERRORS" });
      alert("Failed to sync with server, rolling back changes.");
      dispatch({ type: "UNDO" });
    } else {
      dispatch({ type: "SET_LOADING", loading: false });
      dispatch({ type: "CLEAR_ERRORS" });
    }

    syncingRef.current = false;
  }, []);

  return { state, dispatch, optimisticDispatch };
}
