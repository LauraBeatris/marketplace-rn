export interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

export interface CartContextData {
  products: Product[];
  addToCart(item: Omit<Product, "quantity">): void;
  increment(id: string): void;
  decrement(id: string): void;
  removeProduct(id: string): void;
  totalProductsQuantity: number;
  totalProductsPrice: string;
}
