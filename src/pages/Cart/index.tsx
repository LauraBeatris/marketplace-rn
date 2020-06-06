import React, { useContext } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { View } from "react-native";
import { ThemeContext } from "styled-components";

import { useCart } from "../../hooks/cart";
import formatValue from "../../utils/formatValue";
import FloatingCart from "../../components/FloatingCart";
import {
  MainContainer,
  GradientContainer,
} from "../../styles/components/Containers";
import {
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
  const theme = useContext(ThemeContext);
  const {
    increment,
    decrement,
    removeProduct,
    products,
  } = useCart();

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
    <GradientContainer>
      <MainContainer>
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
                      <FeatherIcon
                        name="plus"
                        color={theme.colors.blueSecondary}
                        size={16}
                      />
                    </ActionButton>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={handleDecrement(item)}
                    >
                      <FeatherIcon
                        name="minus"
                        color={theme.colors.blueSecondary}
                        size={16}
                      />
                    </ActionButton>
                  </ActionContainer>
                </ProductContent>
              );
            }}
          />
        </ProductContainer>
        <FloatingCart />
      </MainContainer>
    </GradientContainer>
  );
};

export default Cart;
