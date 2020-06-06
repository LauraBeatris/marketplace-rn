import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { View, Alert } from "react-native";

import formatValue from "../../utils/formatValue";
import { useCart } from "../../hooks/cart";
import api from "../../services/api";
import FloatingCart from "../../components/FloatingCart";
import Box from "../../components/Box";
import Categories from "../../components/Categories";
import {
  MainContainer,
  GradientContainer,
} from "../../styles/components/Containers";
import {
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from "./styles";

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        Alert.alert(
          "There was an error while listing products. Please, try to reload the screen",
        );
      }
    }

    loadProducts();
  }, []);

  const handleAddToCart = (item: Product) => (): void => {
    addToCart(item);
  };

  return (
    <GradientContainer>
      <MainContainer>
        <ProductContainer>
          <ProductList
            data={products}
            ListHeaderComponent={(
              <View>
                <Box
                  productName={products.title}
                  productPrice={products.price}
                  productPhotoUrl={products.image_url}
                  isNew
                />
                <Categories />
              </View>
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({ item }) => {
              const productImageUri = { uri: item.image_url };
              const productPrice = formatValue(item.price);

              return (
                <Product>
                  <ProductImage source={productImageUri} />
                  <ProductTitle>{item.title}</ProductTitle>
                  <PriceContainer>
                    <ProductPrice>{productPrice}</ProductPrice>
                    <ProductButton
                      testID={`add-to-cart-${item.id}`}
                      onPress={handleAddToCart(item)}
                    >
                      <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                    </ProductButton>
                  </PriceContainer>
                </Product>
              );
            }}
          />
        </ProductContainer>
        <FloatingCart />
      </MainContainer>
    </GradientContainer>
  );
};

export default Dashboard;
