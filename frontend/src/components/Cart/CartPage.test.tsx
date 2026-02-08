import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import CartPage from './CartPage';

// Mock Cart component
jest.mock('./Cart', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-component">Cart Component</div>,
}));

describe('CartPage', () => {
  it('renders Cart component', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: [], isOpen: false, total: 0 } },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    expect(getByTestId('cart-component')).toBeInTheDocument();
  });

  it.skip('dispatches toggleCart on mount when cart is closed', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: [], isOpen: false, total: 0 } },
    });
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    // Component should dispatch toggleCart on mount
    expect(store.getState().cart.isOpen).toBe(true);
  });

  it.skip('does not dispatch toggleCart when cart already open', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: { cart: { items: [], isOpen: true, total: 0 } },
    });
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );
    expect(store.getState().cart.isOpen).toBe(true);
  });
});
