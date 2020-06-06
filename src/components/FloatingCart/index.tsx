import React, { useContext } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components";

import { useCart } from "../../hooks/cart";
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from "./styles";

const FloatingCart: React.FC = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { totalProductsQuantity, totalProductsPrice } = useCart();

  const handleNavigation = (): void => {
    navigation.navigate("Cart");
  };

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={handleNavigation}
      >
        <FeatherIcon
          name="shopping-cart"
          size={24}
          color={theme.colors.blueSecondary}
        />
        <CartButtonText>{`${totalProductsQuantity} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{totalProductsPrice}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
