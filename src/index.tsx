import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import Routes from "./routes";
import AppContainer from "./hooks";
import theme from "./styles/theme";

const App: React.FC = () => (
  <View style={{ backgroundColor: "#312e38", flex: 1 }}>
    <AppContainer>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Routes />
      </ThemeProvider>
    </AppContainer>
  </View>
);

export default App;
