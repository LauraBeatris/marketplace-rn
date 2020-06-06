import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';

import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

const FloatingCart: React.FC = () => {
  const navigation = useNavigation();
  const { products } = useCart();

  const totalProductsPrice = useMemo(() => {
    return formatValue(
      products.reduce(
        (totalPrice, product) => totalPrice + product.price * product.quantity,
        0,
      ),
    );
  }, [products]);

  const totalProductsQuantity = useMemo(() => {
    return products.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0,
    );
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalProductsQuantity} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{totalProductsPrice}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
