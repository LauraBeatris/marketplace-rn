/* eslint-disable import/first */

import React from 'react';

import { mocked } from 'ts-jest/utils';
import { render, fireEvent, act } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
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

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

import FloatingCart from '../../components/FloatingCart';
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

const useNavigationMocked = mocked(useNavigation);

const navigate = jest.fn();

useNavigationMocked.mockReturnValue({
  navigate,
} as any);

describe('Dashboard', () => {
  it('should be able to calculate the cart total', async () => {
    const { getByText } = render(<FloatingCart />);

    expect(getByText('8000')).toBeTruthy();
  });

  it('should be able to show the total quantity of itens in the cart', async () => {
    const { getByText } = render(<FloatingCart />);

    expect(getByText('15 itens')).toBeTruthy();
  });

  it('should be able to navigate to the cart', async () => {
    const { getByTestId } = render(<FloatingCart />);

    act(() => {
      fireEvent.press(getByTestId('navigate-to-cart-button'));
    });

    expect(navigate).toHaveBeenCalledWith('Cart');
  });
});
