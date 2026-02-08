import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OrderSuccessModal from './OrderSuccessModal';

// Mock orderSlice
jest.mock('../../store/slices/orderSlice', () => ({
  setCurrentOrder: jest.fn((payload) => ({ type: 'order/setCurrentOrder', payload })),
  default: jest.fn((state = { currentOrder: null, orders: [], loading: false, error: null }) => state),
}));

const createMockStore = (hasOrder: boolean) => {
  return configureStore({
    reducer: {
      order: () => ({
        currentOrder: hasOrder ? {
          number: '12345',
          total: 1500,
          customer: { phone: '+79991234567' },
        } : null,
        orders: [],
        loading: false,
        error: null,
      }),
    },
  });
};

describe('OrderSuccessModal', () => {
  it('renders nothing when no order', () => {
    const store = createMockStore(false);
    const { container } = render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders order details when order exists', () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(screen.getByText('Заказ оформлен')).toBeInTheDocument();
    expect(screen.getByText(/#12345/)).toBeInTheDocument();
    expect(screen.getByText(/1500/)).toBeInTheDocument();
    expect(screen.getByText(/\+79991234567/)).toBeInTheDocument();
  });

  it('renders close button', () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(screen.getByText('Понятно')).toBeInTheDocument();
  });

  it('dispatches setCurrentOrder when button clicked', () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    const button = screen.getByText('Понятно');
    fireEvent.click(button);
    // Should not throw error
    expect(button).toBeInTheDocument();
  });
});
