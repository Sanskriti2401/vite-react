import { createEffect, createSignal, Show } from "solid-js";
import { jwt, addToCart } from "cart/cart";
import "./AddToCartButton.css";

interface AddToCartButtonProps {
  id: string;
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  createEffect(() => {
    const subscription = jwt.subscribe((jwt: string | null) => {
      setLoggedIn(!!jwt);
    });
    return () => subscription.unsubscribe();
  });

  return (
    <Show when={loggedIn()}>
      <button
        onClick={() => addToCart(props.id)}
        class="add-to-cart-button"
      >
        Add To Cart
      </button>
    </Show>
  );
};

export default AddToCartButton;
