Shopping Cart - Modular React + TypeScript Implementation

Overview

In this Task, I have implement a fully functional shopping cart system with advanced state management, using React and TypeScript. It’s built with modular components, a clean state architecture, and user-friendly interactions.
Features

    Add/remove items, update quantities

    Real-time calculation of subtotal, tax, shipping, discount, and total

    Apply discount codes with immediate validation feedback

    Undo functionality for recent actions

    Optimistic UI updates with simulated server sync and error recovery

    Persistent cart state using localStorage

    Responsive product grid and cart sidebar UI

Project Structure

    Types: All TypeScript types live in /interfaces/cartInterface.ts for easy reuse and maintenance.

    Utils: Business logic helpers like total calculation live in /utils/cartUtils.ts.

    Hooks: Custom useCart hook encapsulates all cart state management with reducer logic.

    Components: UI split into clear, small components:

        ProductGrid — lists products and lets users add to cart

        CartSidebar — slide-out cart UI with all cart actions

        CartSummary — shows price breakdown and totals

        QuantityInput — numeric input to update item quantity

    Main Component: index.tsx inside /components/Cart brings everything together with state hooks.

How State Is Managed

    Uses useReducer with clear action types (ADD_ITEM, REMOVE_ITEM, etc.) to keep state predictable and maintainable.

    Stores undo stack in state to support undoing actions.

    Saves and loads cart state to/from localStorage for persistence.

    Uses optimistic updates for smooth UI — updates immediately and then simulates server sync.

    Handles simulated sync failures gracefully with error messages and automatic rollback via undo.

UX Highlights

    Cart sidebar toggles open/closed and shows all cart items.

    Quantity changes are instantly reflected in totals.

    Discount codes update totals live, with clear invalid code errors.

    Undo button lets user revert last action.

    Syncing state indicator and error messages keep user informed.

    Disabled buttons and input validations prevent invalid user actions.

Performance and Code Quality

    Modular components minimize unnecessary re-renders.

    Custom hook centralizes logic, keeps UI components clean.

    Types enforce data correctness across components.

    Clear separation of UI and logic improves maintainability.

    No external state management library—simple but scalable solution.

How to Use

    Add products via ProductGrid component.

    Open cart sidebar to view and modify cart contents.

    Change item quantities or remove items.

    Enter discount codes to see real-time discounts applied.

    Undo last changes if needed.

    Checkout (currently demo alert).
