import React, { useEffect, useState } from "react";
import { cart, clearCart } from "./cart";
import { currency } from "home/products";
import "./MiniCart.css";

interface CartItem {
  id: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
}

function MiniCart(){
  const [items, setItems] = useState<CartItem[] | undefined>(undefined);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setItems(cart.value?.cartItems);
    return cart.subscribe((c) => {
      setItems(c?.cartItems);
    });
  }, []);

  if (!items) return null;

  return (
    <>
      <span onClick={() => setShowCart(!showCart)} id="showcart_span">
        <i className="ri-shopping-cart-2-fill mini-cart-icon" id="showcart"></i>
        {items.length}
      </span>
      {showCart && (
        <div className="mini-cart" style={{ top: "2rem", left: -250 }}>
          <div className="mini-cart-items" style={{ gridTemplateColumns: "1fr 3fr 10fr 2fr" }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <div>{item.quantity}</div>
                <img src={item.image} alt={item.name} className="mini-cart-image" />
                <div>{item.name}</div>
                <div className="text-right">
                  {currency.format(item.quantity * item.price)}
                </div>
              </React.Fragment>
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div>
              {currency.format(
                items.reduce((a, v) => a + v.quantity * v.price, 0)
              )}
            </div>
          </div>
          <div className="mini-cart-actions">
            <div className="flex-grow">
              <button
                id="clearcart"
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
            <div className="flex-end">
              <button
                className="checkout-button"
                onClick={clearCart}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiniCart;
