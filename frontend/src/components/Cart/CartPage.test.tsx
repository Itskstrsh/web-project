import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartPage from './CartPage';
import cartReducer from '../../store/slices/cartSlice';

// Mock Cart component
jest.mock('./Cart', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-component">Cart Component</div>,
}));

const createMockStore = (isOpen: boolean) => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: {
        items: [],
        isOpen,
        total: 0,
      },
    },
  });
};

describe('CartPage', () => {
  it('renders Cart component', () => {
    const store = createMockStore(false);
    const { getByTestId } = render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    expect(getByTestId('cart-component')).toBeInTheDocument();
  });

  it('opens cart when closed', () => {
    const store = createMockStore(false);
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    // After useEffect, cart should be open
    expect(store.getState().cart.isOpen).toBe(true);
  });

  it('keeps cart open when already open', () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    expect(store.getState().cart.isOpen).toBe(true);
  });
});
