import { render } from "solid-js/web";
import AddToCart from "./AddToCart";
import "./placeAddToCart.css";

export default function placeAddToCart(el: HTMLElement, id: string) {
  render(() => <AddToCart id={id} />, el);
}
