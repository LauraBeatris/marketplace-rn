import React from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { View } from "react-native";

import { useCart } from "../../hooks/cart";
import formatValue from "../../utils/formatValue";
import FloatingCart from "../../components/FloatingCart";
import {
  Container,
  ProductContainer,
  ProductContent,
  ProductList,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  ProductQuantity,
  TotalContainer,
  ProductPrice,
  ActionContainer,
  ActionButton,
} from "./styles";
import { Product } from "./types";

const Cart: React.FC = () => {
  const { increment, decrement, removeProduct, products } = useCart();

  const handleIncrement = (id: string) => (): void => {
    increment(id);
  };

  const handleDecrement = (product: Product) => (): void => {
    if (product.quantity <= 1) {
      removeProduct(product.id);
      return;
    }

    decrement(product.id);
  };

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: Product }) => {
            const singleProductPrice = formatValue(item.price);
            const totalProductPrice = formatValue(item.price * item.quantity);
            const productImageUrl = { uri: item.image_url };

            return (
              <ProductContent>
                <ProductImage source={productImageUrl} />
                <ProductTitleContainer>
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductPriceContainer>
                    <ProductSinglePrice>
                      {singleProductPrice}
                    </ProductSinglePrice>

                    <TotalContainer>
                      <ProductQuantity>{`${item.quantity}x `}</ProductQuantity>
                      <ProductPrice>{totalProductPrice}</ProductPrice>
                    </TotalContainer>
                  </ProductPriceContainer>
                </ProductTitleContainer>
                <ActionContainer>
                  <ActionButton
                    testID={`increment-${item.id}`}
                    onPress={handleIncrement(item.id)}
                  >
                    <FeatherIcon name="plus" color="#E83F5B" size={16} />
                  </ActionButton>
                  <ActionButton
                    testID={`decrement-${item.id}`}
                    onPress={handleDecrement(item)}
                  >
                    <FeatherIcon name="minus" color="#E83F5B" size={16} />
                  </ActionButton>
                </ActionContainer>
              </ProductContent>
            );
          }}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Cart;
