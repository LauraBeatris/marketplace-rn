import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./routes";
import CartContainer from "./context/cart/CartContainer";
import theme from "./styles/theme";

const App: React.FC = () => (
  <View style={{ backgroundColor: "#312e38", flex: 1 }}>
    <NavigationContainer>
      <CartContainer>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <Routes />
        </ThemeProvider>
      </CartContainer>
    </NavigationContainer>
  </View>
);

export default App;
