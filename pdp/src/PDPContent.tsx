import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useParams } from "react-router-dom";

import { getProductById, currency } from "home/products";
import placeAddToCart from "addtocart/placeAddToCart";

import "./PDPContent.css";

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
}

export default function PDPContent() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  const addToCart: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (addToCart.current && product) {
      placeAddToCart(addToCart.current, product.id);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="pdp-container">
      <div className="pdp-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="pdp-details">
        <div className="pdp-header">
          <h1 className="pdp-title">{product.name}</h1>
          <div className="pdp-price">{currency.format(product.price)}</div>
        </div>
        <div ref={addToCart}></div>
        <div className="pdp-description">{product.description}</div>
        <div className="pdp-long-description">{product.longDescription}</div>
      </div>
    </div>
  );
}
