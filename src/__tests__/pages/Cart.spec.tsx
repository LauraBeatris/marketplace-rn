/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act } from '@testing-library/react-native';

jest.mock('../../hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: jest.fn().mockReturnValue({
    addToCart: jest.fn(),
    products: [],
  }),
}));

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

import Cart from '../../pages/Cart';
import { useCart } from '../../hooks/cart';

const useCartMocked = mocked(useCart);

useCartMocked.mockReturnValue({
  addToCart: jest.fn(),
  products: [
    {
      id: '1234',
      title: 'Cadeira Rivatti',
      image_url:
        'https://http2.mlstatic.com/cadeira-rivatti-branca-pes-madeira-confortavel-bonita-D_NQ_NP_981901-MLB20422264882_092015-F.jpg',
      price: 400,
      quantity: 5,
    },
    {
      id: '12345',
      title: 'Poltrona de madeira',
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRod5Tf0R0LkCjClrgAJU0tM713nyqHTP2lFbXU1o5zheYpwgfonTTde8swBNlahgij4hGeOgn7hQ&usqp=CAc',
      price: 600,
      quantity: 10,
    },
  ],
  increment: jest.fn(),
  decrement: jest.fn(),
});

describe('Dashboard', () => {
  it('should be able to list products on the cart', async () => {
    const { getByText } = render(<Cart />);

    expect(getByText('Cadeira Rivatti')).toBeTruthy();
    expect(getByText('400')).toBeTruthy();
    expect(getByText('2000')).toBeTruthy();
    expect(getByText('5x')).toBeTruthy();

    expect(getByText('Poltrona de madeira')).toBeTruthy();
    expect(getByText('600')).toBeTruthy();
    expect(getByText('6000')).toBeTruthy();
    expect(getByText('10x')).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<Cart />);

    expect(getByText('8000')).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<Cart />);

    expect(getByText('15 itens')).toBeTruthy();
  });

  it('should be able to increment product quantity on the cart', async () => {
    const increment = jest.fn();

    useCartMocked.mockReturnValue({
      addToCart: jest.fn(),
      products: [
        {
          id: '1234',
          title: 'Cadeira Rivatti',
          image_url:
            'https://http2.mlstatic.com/cadeira-rivatti-branca-pes-madeira-confortavel-bonita-D_NQ_NP_981901-MLB20422264882_092015-F.jpg',
          price: 400,
          quantity: 5,
        },
      ],
      increment,
      decrement: jest.fn(),
    });

    const { getByTestId } = render(<Cart />);

    act(() => {
      fireEvent.press(getByTestId('increment-1234'));
    });

    expect(increment).toHaveBeenCalledWith('1234');
  });

  it('should be able to decrement product quantity on the cart', async () => {
    const decrement = jest.fn();

    useCartMocked.mockReturnValue({
      addToCart: jest.fn(),
      products: [
        {
          id: '1234',
          title: 'Cadeira Rivatti',
          image_url:
            'https://http2.mlstatic.com/cadeira-rivatti-branca-pes-madeira-confortavel-bonita-D_NQ_NP_981901-MLB20422264882_092015-F.jpg',
          price: 400,
          quantity: 5,
        },
      ],
      increment: jest.fn(),
      decrement,
    });

    const { getByTestId } = render(<Cart />);

    act(() => {
      fireEvent.press(getByTestId('decrement-1234'));
    });

    expect(decrement).toHaveBeenCalledWith('1234');
  });
});
