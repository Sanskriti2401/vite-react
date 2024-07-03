const API_SERVER = "http://localhost:8080";

// Define a type for Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Fetch products
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_SERVER}/products`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const products = await response.json();
  return products;
};

// Fetch product by ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_SERVER}/products/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const product = await response.json();
  return product;
};

// Currency formatting utility
export const currency = new Intl.NumberFormat("en-INR", {
  style: "currency",
  currency: "INR",
});
