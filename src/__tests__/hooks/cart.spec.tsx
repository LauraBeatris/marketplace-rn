/* eslint-disable import/first */

import React from 'react';
import { mocked } from 'ts-jest/utils';
import { View, Text, TouchableOpacity } from 'react-native';

import {
  render,
  fireEvent,
  act,
  wait,
  cleanup,
} from '@testing-library/react-native';

jest.useFakeTimers();

jest.mock('@react-native-community/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn().mockReturnValue(null),
    clear: jest.fn(),
  },
}));

import AsyncStorage from '@react-native-community/async-storage';
import { CartProvider, useCart } from '../../hooks/cart';

const TestComponent: React.FC = () => {
  const { products, addToCart, increment, decrement } = useCart();

  function handleAddToCart(): void {
    addToCart({
      id: '1234',
      title: 'Test product',
      image_url: 'test',
      price: 1000,
      quantity: 0,
    });
  }

  function handleIncrement(): void {
    increment('1234');
  }

  function handleDecrement(): void {
    decrement('1234');
  }

  return (
    <>
      <TouchableOpacity testID="add-to-cart" onPress={handleAddToCart}>
        Add to cart
      </TouchableOpacity>

      <TouchableOpacity testID="increment" onPress={handleIncrement}>
        Increment
      </TouchableOpacity>

      <TouchableOpacity testID="decrement" onPress={handleDecrement}>
        Decrement
      </TouchableOpacity>

      {products.map(product => (
        <View key={product.id}>
          <Text>{product.title}</Text>
          <Text>{product.quantity}</Text>
        </View>
      ))}
    </>
  );
};

const mockedAsyncStorage = mocked(AsyncStorage);

describe('Cart Context', () => {
  afterEach(() => {
    mockedAsyncStorage.setItem.mockClear();
    mockedAsyncStorage.getItem.mockClear();

    cleanup();
  });

  it('should be able to add products to the cart', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    expect(getByText('Test product')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('should be able to increment quantity', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    act(() => {
      fireEvent.press(getByTestId('increment'));
    });

    expect(getByText('2')).toBeTruthy();
  });

  it('should be able to decrement quantity', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    act(() => {
      fireEvent.press(getByTestId('increment'));
    });

    act(() => {
      fireEvent.press(getByTestId('decrement'));
    });

    expect(getByText('1')).toBeTruthy();
  });

  it('should load products from AsyncStorage', async () => {
    mockedAsyncStorage.getItem.mockReturnValue(
      new Promise(resolve =>
        resolve(
          JSON.stringify([
            {
              id: '1234',
              title: 'Test product',
              image_url: 'test',
              price: 1000,
              quantity: 0,
            },
          ]),
        ),
      ),
    );

    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await wait(() => expect(getByText('Test product')).toBeTruthy());

    expect(getByText('Test product')).toBeTruthy();
  });

  it('should store products in AsyncStorage while adding, incrementing and decrementing', async () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('decrement'));
    });

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledTimes(3);
  });
});
