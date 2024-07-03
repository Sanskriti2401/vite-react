import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviorSubject<string | null>(null);
export const cart = new BehaviorSubject<{ cartItems: CartItem[] } | null>(null);

interface CartItem {
  id: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
}

export const getCart = async () => {
  const response = await fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  });
  const result = await response.json();
  cart.next(result);
  return result;
};

export const addToCart = async (id: string) => {
  await fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
    body: JSON.stringify({ id }),
  });
  await getCart();
};

export const clearCart = async () => {
  await fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  });
  await getCart();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  jwt.next(data.access_token);
  await getCart();
  return data.access_token;
};

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!jwt.value);

  useEffect(() => {
    setLoggedIn(!!jwt.value);
    const subscription = jwt.subscribe((token) => {
      setLoggedIn(!!token);
    });
    return () => subscription.unsubscribe();
  }, []);

  return loggedIn;
}
