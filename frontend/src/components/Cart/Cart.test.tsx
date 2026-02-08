import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/slices/cartSlice';
import Cart from './Cart';

// Mock CheckoutModal to avoid import.meta.env issues
jest.mock('../Checkout/CheckoutModal', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="checkout-modal">
      <button onClick={onClose}>Close Checkout</button>
    </div>
  ),
}));

const createMockStore = (cartState: { items: Array<{ id: string; name: string; price: number; quantity: number; imageUrl?: string }>; isOpen?: boolean }) => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { isOpen: false, total: 0, ...cartState } },
  });
};

describe('Cart', () => {
  it('renders nothing when cart is closed', () => {
    const store = createMockStore({ items: [], isOpen: false });
    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders empty cart message', () => {
    const store = createMockStore({ items: [], isOpen: true });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });

  it('renders cart with items', () => {
    const store = createMockStore({
      items: [
        { id: '1', name: 'Test Item', price: 100, quantity: 2, imageUrl: 'test.jpg' },
      ],
      isOpen: true,
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('200 ₽')).toBeInTheDocument();
  });

  it('displays correct item count text (1 item)', () => {
    const store = createMockStore({
      items: [{ id: '1', name: 'Item', price: 100, quantity: 1 }],
      isOpen: true,
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    expect(screen.getByText(/1 товар(ов)?/)).toBeInTheDocument();
  });

  it('closes cart when close button clicked', () => {
    const store = createMockStore({ items: [], isOpen: true });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    const closeButton = screen.getByLabelText('Закрыть');
    fireEvent.click(closeButton);
    expect(store.getState().cart.isOpen).toBe(false);
  });

  it('opens checkout when checkout button clicked', () => {
    const store = createMockStore({
      items: [{ id: '1', name: 'Item', price: 100, quantity: 1 }],
      isOpen: true,
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    const checkoutButton = screen.getByText('Оформить заказ');
    fireEvent.click(checkoutButton);
    expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
  });
});
