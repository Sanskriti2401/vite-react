import { useState, useEffect } from "react";
import { cart, CartItem } from "cart/cart"; // Assuming `CartItem` is the type for cart items

interface Cart {
  cartItems: CartItem[];
  subscribe: (callback: (state: { cartItems: CartItem[] }) => void) => void;
}

export function useCartCount(): number {
  const [count, setCount] = useState<number>(cart.cartItems.length);

  useEffect(() => {
    const subscription = (state: { cartItems: CartItem[] }) => setCount(state.cartItems.length);
    cart.subscribe(subscription);
    return () => {
      // Cleanup if cart has an unsubscribe method (not shown in original code)
      // cart.unsubscribe(subscription);
    };
  }, []);

  return count;
}
