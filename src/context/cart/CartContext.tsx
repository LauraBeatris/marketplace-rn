import * as React from "react";

import { CartContextData } from "./types";

export const CartContext = React.createContext<CartContextData | null>(null);

export const CartProvider = CartContext.Provider;

export const useCart = (): CartContextData => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
