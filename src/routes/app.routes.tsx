import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "styled-components";

import Dashboard from "../pages/Dashboard";
import Cart from "../pages/Cart";
import Title from "../styles/components/Title";
import { DASHBOARD_ROUTE_NAME, CART_ROUTE_NAME } from "./routes";

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName={DASHBOARD_ROUTE_NAME}
    >
      <App.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: "left",
          headerTitleContainerStyle: {
            paddingTop: 40,
          },
          headerTitle: () => (
            <Title>Marketplace</Title>
          ),
        }}
        name={DASHBOARD_ROUTE_NAME}
        component={Dashboard}
      />
      <App.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Title>Cart</Title>
          ),
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerBackImage: () => (
            <FeatherIcon
              name="chevron-left"
              color={theme.colors.white}
              size={24}
            />
          ),
        }}
        name={CART_ROUTE_NAME}
        component={Cart}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
