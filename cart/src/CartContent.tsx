import React, { useState, useEffect } from "react";
import { cart, clearCart } from "cart/cart";
import { currency } from "home/products";
import "./CartContent.css";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const subscription = cart.subscribe((value) => setItems(value?.cartItems ?? []));
    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      <div className="cart-grid">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div>{item.quantity}</div>
            <img src={item.image} alt={item.name} className="cart-image" />
            <div>{item.name}</div>
            <div className="cart-item-price">
              {currency.format(item.quantity * item.price)}
            </div>
          </React.Fragment>
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div className="cart-total" id="grand_total">
          {currency.format(total)}
        </div>
      </div>
      {items.length > 0 && (
        <div className="cart-actions">
          <div className="cart-clear">
            <button
              id="clearcart"
              className="cart-clear-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="cart-checkout">
            <button
              className="cart-checkout-button"
              onClick={clearCart}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
