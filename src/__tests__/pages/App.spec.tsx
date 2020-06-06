/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act, wait } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

jest.mock('@react-navigation/native', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    useNavigation: jest.fn(),
  };
});

jest.mock('../../hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: jest.fn().mockReturnValue({
    addToCart: jest.fn(),
    products: [],
  }),
}));

import Dashboard from '../../pages/Dashboard';
import { useCart } from '../../hooks/cart';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list products', async () => {
    apiMock.onGet('products').reply(200, [
      {
        id: '1234',
        title: 'Cadeira Rivatti',
        image_url:
          'https://http2.mlstatic.com/cadeira-rivatti-branca-pes-madeira-confortavel-bonita-D_NQ_NP_981901-MLB20422264882_092015-F.jpg',
        price: 400,
      },
      {
        id: '123456',
        title: 'Poltrona de madeira',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRod5Tf0R0LkCjClrgAJU0tM713nyqHTP2lFbXU1o5zheYpwgfonTTde8swBNlahgij4hGeOgn7hQ&usqp=CAc',
        price: 600,
      },
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Cadeira Rivatti')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Cadeira Rivatti')).toBeTruthy();
    expect(getByTestId('add-to-cart-1234')).toBeTruthy();

    expect(getByText('Poltrona de madeira')).toBeTruthy();
    expect(getByTestId('add-to-cart-123456')).toBeTruthy();
  });

  it('should be able to add item to cart', async () => {
    const useCartMocked = mocked(useCart);

    const addToCart = jest.fn();

    useCartMocked.mockReturnValue({
      addToCart,
      products: [],
      increment: jest.fn(),
      decrement: jest.fn(),
    });

    const products = [
      {
        id: '1234',
        title: 'Cadeira Rivatti',
        image_url:
          'https://http2.mlstatic.com/cadeira-rivatti-branca-pes-madeira-confortavel-bonita-D_NQ_NP_981901-MLB20422264882_092015-F.jpg',
        price: 400,
      },
      {
        id: '123456',
        title: 'Poltrona de madeira',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRod5Tf0R0LkCjClrgAJU0tM713nyqHTP2lFbXU1o5zheYpwgfonTTde8swBNlahgij4hGeOgn7hQ&usqp=CAc',
        price: 600,
      },
    ];

    apiMock.onGet('products').reply(200, products);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Cadeira Rivatti')).toBeTruthy(), {
      timeout: 200,
    });

    act(() => {
      fireEvent.press(getByTestId('add-to-cart-1234'));
    });

    expect(addToCart).toHaveBeenCalledWith(products[0]);
  });
});
