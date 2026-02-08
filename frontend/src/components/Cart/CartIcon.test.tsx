import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import CartIcon from './CartIcon';

const createMockStore = (cartState: { items: Array<{ id: string; name: string; price: number; quantity: number }>; isOpen?: boolean; total?: number }) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        isOpen: false,
        total: 0,
        ...cartState,
      },
    },
  });
};

describe('CartIcon', () => {
  it('renders without crashing', () => {
    const store = createMockStore({ items: [] });
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    expect(screen.getByLabelText('Корзина')).toBeInTheDocument();
  });

  it('shows no badge when cart is empty', () => {
    const store = createMockStore({ items: [] });
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    const badge = screen.queryByText(/[0-9]/);
    expect(badge).not.toBeInTheDocument();
  });

  it('shows correct item count when cart has items', () => {
    const store = createMockStore({
      items: [
        { id: '1', name: 'Item 1', price: 100, quantity: 2 },
        { id: '2', name: 'Item 2', price: 200, quantity: 3 },
      ],
    });
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 9+ when item count exceeds 9', () => {
    const store = createMockStore({
      items: [
        { id: '1', name: 'Item 1', price: 100, quantity: 5 },
        { id: '2', name: 'Item 2', price: 200, quantity: 5 },
      ],
    });
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  it('dispatches toggleCart when clicked', () => {
    const store = createMockStore({ items: [] });
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    const button = screen.getByLabelText('Корзина');
    fireEvent.click(button);
    const state = store.getState();
    expect(state.cart.isOpen).toBe(true);
  });
});
