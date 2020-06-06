import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";

import formatValue from "../utils/formatValue";
import { CART_PRODUCTS_STORAGE_KEY } from "../constants/asyncStorage";

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, "quantity">): void;
  increment(id: string): void;
  decrement(id: string): void;
  removeProduct(id: string): void;
  totalProductsQuantity: number;
  totalProductsPrice: string;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storagedProducts = await AsyncStorage.getItem(
        CART_PRODUCTS_STORAGE_KEY,
      );

      if (storagedProducts) {
        setProducts(JSON.parse(storagedProducts));
      }
    }

    loadProducts();
  }, []);

  const saveProducts = useCallback(async (newProducts): Promise<void> => {
    await AsyncStorage.setItem(
      CART_PRODUCTS_STORAGE_KEY,
      JSON.stringify(newProducts),
    );
  }, []);

  const findProductById = useCallback(
    (id: string) => products.find(product => product.id === id),
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const foundProduct = findProductById(product.id);

      setProducts(prevProducts => {
        const updatedProducts = foundProduct
          ? prevProducts.map(prevProduct => ({
            ...prevProduct,
            quantity: prevProduct.quantity + 1,
          }))
          : [
            ...prevProducts,
            {
              ...product,
              quantity: 1,
            },
          ];

        saveProducts(updatedProducts);
        return updatedProducts;
      });
    },
    [findProductById, saveProducts],
  );

  const increment = useCallback(
    async id => {
      const foundProduct = findProductById(id);

      const updatedProducts = products.map(product => {
        if (foundProduct) {
          return {
            ...foundProduct,
            quantity: foundProduct.quantity + 1,
          };
        }
        return product;
      });

      saveProducts(updatedProducts);
      setProducts(updatedProducts);
    },
    [findProductById, saveProducts, products],
  );

  const decrement = useCallback(
    async id => {
      const foundProduct = findProductById(id);

      const updatedProducts = products.map(product => {
        if (foundProduct) {
          return {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          };
        }

        return product;
      });

      saveProducts(updatedProducts);
      setProducts(updatedProducts);
    },
    [findProductById, saveProducts, products],
  );

  const removeProduct = useCallback(
    (id: string): void => {
      const filteredProducts = products.filter(product => product.id !== id);
      saveProducts(filteredProducts);
      setProducts(filteredProducts);
    },
    [products, saveProducts],
  );

  const totalProductsPrice = useMemo(() => formatValue(
    products.reduce(
      (totalPrice, product) => totalPrice + product.price * product.quantity,
      0,
    ),
  ), [products]);

  const totalProductsQuantity = useMemo(() => products.reduce(
    (totalQuantity, product) => totalQuantity + product.quantity,
    0,
  ), [products]);

  const value = useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      removeProduct,
      totalProductsPrice,
      totalProductsQuantity,
    }),
    [
      products,
      addToCart,
      increment,
      decrement,
      removeProduct,
      totalProductsPrice,
      totalProductsQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
