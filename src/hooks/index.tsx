import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { CartProvider } from "./cart";

const AppProvider: React.FC = ({ children }) => {
  return (
    <CartProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CartProvider>
  );
};

export default AppProvider;
