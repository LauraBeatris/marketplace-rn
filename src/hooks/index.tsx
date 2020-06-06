import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '../helpers/navigation';
import { CartProvider } from './cart';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CartProvider>
      <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
    </CartProvider>
  );
};

export default AppProvider;
