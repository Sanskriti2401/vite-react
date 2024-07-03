import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, currency } from "./products";
import { addToCart, useLoggedIn } from "cart/cart";
import "./HomeContent.css";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

function HomeContent(){
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="home-content">
      {products.map((product) => (
        <div key={product.id} className="product">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <div className="product-info">
            <div className="product-name">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </div>
            <div className="product-price">
              {currency.format(product.price)}
            </div>
          </div>
          <div className="product-description">{product.description}</div>
          {loggedIn && (
            <div className="add-to-cart">
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product.id)}
                id={`addtocart_${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
