import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import useDidMount from "@rooks/use-did-mount";
import AsyncStorage from "@react-native-community/async-storage";

import formatValue from "../../utils/formatValue";
import findItemById from "../../utils/findItemById";
import { CART_PRODUCTS_STORAGE_KEY } from "../../constants/asyncStorage";
import { CartProvider } from "./CartContext";
import { Product } from "./types";

const CartContainer: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useDidMount(() => {
    async function loadProducts(): Promise<void> {
      const storagedProducts = await AsyncStorage.getItem(
        CART_PRODUCTS_STORAGE_KEY,
      );

      if (storagedProducts) {
        setProducts(JSON.parse(storagedProducts));
      }
    }

    loadProducts();
  });

  useEffect(() => {
    async function saveProducts(): Promise<void> {
      await AsyncStorage.setItem(
        CART_PRODUCTS_STORAGE_KEY,
        JSON.stringify(products),
      );
    }

    saveProducts();
  }, [products]);

  const addToCart = useCallback(
    async product => {
      const productFound = findItemById<Product>(product.id, products);

      if (productFound) {
        setProducts(prevProducts => (
          prevProducts.map(prevProduct => {
            if (prevProduct.id === productFound.id) {
              return {
                ...productFound,
                quantity: productFound.quantity + 1,
              };
            }

            return prevProduct;
          })
        ));
      } else {
        setProducts(prevProducts => (
          [...prevProducts, { ...product, quantity: 1 }]
        ));
      }
    },
    [
      products,
    ],
  );

  const increment = useCallback(id => {
    const productFound = findItemById<Product>(id, products);

    setProducts(prevProducts => (
      prevProducts.map(product => {
        if (productFound?.id === product.id) {
          return {
            ...product,
            quantity: productFound.quantity + 1,
          };
        }

        return product;
      })
    ));
  },
  [products]);

  const decrement = useCallback(id => {
    const productFound = findItemById<Product>(id, products);

    setProducts(prevProducts => (
      prevProducts.map(product => {
        if (productFound?.id === product.id) {
          return {
            ...product,
            quantity: productFound.quantity - 1,
          };
        }

        return product;
      })
    ));
  },
  [products]);

  const removeProduct = useCallback(
    (id: string): void => {
      setProducts(prevProducts => (
        prevProducts.filter(product => product.id !== id)
      ));
    },
    [],
  );

  const totalProductsPrice = useMemo(() => formatValue(
    products.reduce(
      (totalPrice, product) => {
        const productSubtotal = product.price * product.quantity;
        return totalPrice + productSubtotal;
      },
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

  return <CartProvider value={value}>{children}</CartProvider>;
};

export default CartContainer;
