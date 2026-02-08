import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../../store/slices/orderSlice';
import OrderSuccessModal from './OrderSuccessModal';

const createMockStore = (orderState: { currentOrder: any | null; orders?: any[] }) => {
  return configureStore({
    reducer: { order: orderReducer },
    preloadedState: { 
      order: { 
        currentOrder: orderState.currentOrder, 
        orders: orderState.orders || [],
        loading: false, 
        error: null 
      } 
    },
  });
};

describe('OrderSuccessModal', () => {
  it('renders nothing when no order', () => {
    const store = createMockStore({ currentOrder: null });
    const { container } = render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders order details when order exists', () => {
    const store = createMockStore({
      currentOrder: {
        number: '123',
        total: 1500,
        customer: { phone: '+79991234567' },
      },
    });
    render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(screen.getByText('Заказ оформлен')).toBeInTheDocument();
    expect(screen.getByText(/#123/)).toBeInTheDocument();
    expect(screen.getByText(/1500/)).toBeInTheDocument();
    expect(screen.getByText(/\+79991234567/)).toBeInTheDocument();
  });

  it('renders close button', () => {
    const store = createMockStore({
      currentOrder: {
        number: '123',
        total: 1500,
        customer: { phone: '+79991234567' },
      },
    });
    render(
      <Provider store={store}>
        <OrderSuccessModal />
      </Provider>
    );
    expect(screen.getByText('Понятно')).toBeInTheDocument();
  });
});
