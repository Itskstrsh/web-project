import orderSliceReducer, {
  createOrder,
  resendOrderToBot,
  loadOrdersFromStorage,
  setCurrentOrder,
  clearOrders,
  updateOrderStatus,
  addTestOrder,
  type IOrder,
} from './orderSlice';

declare const global: {
  fetch: jest.Mock;
};

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('reducers', () => {
    it('should return initial state', () => {
      expect(orderSliceReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setCurrentOrder', () => {
      const order: IOrder = {
        id: '1',
        number: '0101-001',
        items: [],
        customer: { phone: '+79990000000' },
        delivery: { type: 'pickup', price: 0 },
        total: 100,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const state = orderSliceReducer(initialState, setCurrentOrder(order));
      expect(state.currentOrder).toEqual(order);
    });

    it('should handle setCurrentOrder with null', () => {
      const stateWithOrder = {
        ...initialState,
        currentOrder: { id: '1' } as IOrder,
      };
      const state = orderSliceReducer(stateWithOrder, setCurrentOrder(null));
      expect(state.currentOrder).toBeNull();
    });

    it('should handle clearOrders', () => {
      const stateWithOrders = {
        ...initialState,
        orders: [{ id: '1' } as IOrder],
        currentOrder: { id: '1' } as IOrder,
      };
      const state = orderSliceReducer(stateWithOrders, clearOrders());
      expect(state.orders).toEqual([]);
      expect(state.currentOrder).toBeNull();
    });

    it('should handle updateOrderStatus', () => {
      const order: IOrder = {
        id: '1',
        number: '0101-001',
        items: [],
        customer: { phone: '+79990000000' },
        delivery: { type: 'pickup', price: 0 },
        total: 100,
        status: 'pending',
        createdAt: new Date().toISOString(),
        pendingAt: new Date().toISOString(),
      };

      const stateWithOrder = {
        ...initialState,
        orders: [order],
      };

      const state = orderSliceReducer(
        stateWithOrder,
        updateOrderStatus({ orderId: '1', status: 'confirmed' })
      );

      expect(state.orders[0].status).toBe('confirmed');
      // confirmedAt добавляется динамически через (order as any)[statusKey]
      expect((state.orders[0] as any).confirmedAt).toBeDefined();
    });

    it('should handle addTestOrder', () => {
      const state = orderSliceReducer(initialState, addTestOrder());
      expect(state.orders.length).toBe(1);
      expect(state.orders[0].customer.name).toBe('Тестовый клиент');
    });
  });

  describe('createOrder thunk', () => {
    it('should create order successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const orderData = {
        items: [{ id: '1', name: 'Test', price: 100, quantity: 1, weight: 500, imageUrl: '' }],
        customer: { phone: '+79990000000', name: 'Test' },
        delivery: { type: 'pickup' as const, price: 0 },
        total: 100,
        paymentMethod: 'cash' as const,
      };

      const action = await createOrder(orderData)(jest.fn(), () => ({ order: initialState }), undefined) as { type: string; payload: IOrder };

      expect(action.type).toBe('order/create/fulfilled');
      expect(action.payload).toHaveProperty('id');
      expect(action.payload).toHaveProperty('number');
      expect(action.payload.status).toBe('pending');
    });

    it('should handle createOrder pending', () => {
      const state = orderSliceReducer(initialState, { type: createOrder.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle createOrder fulfilled', () => {
      const order: IOrder = {
        id: '1',
        number: '0101-001',
        items: [],
        customer: { phone: '+79990000000' },
        delivery: { type: 'pickup', price: 0 },
        total: 100,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const state = orderSliceReducer(
        { ...initialState, loading: true },
        { type: createOrder.fulfilled.type, payload: order }
      );

      expect(state.loading).toBe(false);
      expect(state.orders).toContainEqual(order);
      expect(state.currentOrder).toEqual(order);
    });

    it('should handle createOrder rejected', () => {
      const state = orderSliceReducer(
        { ...initialState, loading: true },
        { type: createOrder.rejected.type, payload: 'Error message' }
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error message');
    });
  });

  describe('resendOrderToBot thunk', () => {
    it('should resend order to bot successfully', async () => {
      const order: IOrder = {
        id: '1',
        number: '0101-001',
        items: [],
        customer: { phone: '+79990000000' },
        delivery: { type: 'pickup', price: 0 },
        total: 100,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const getState = () => ({ order: { orders: [order] } }) as any;
      const action = await resendOrderToBot('1')(jest.fn(), getState, undefined);

      expect(action.type).toBe('order/resendToBot/fulfilled');
    });

    it('should handle resendOrderToBot rejected when order not found', async () => {
      const getState = () => ({ order: { orders: [] } }) as any;
      const action = await resendOrderToBot('1')(jest.fn(), getState, undefined);

      expect(action.type).toBe('order/resendToBot/rejected');
    });

    it('should handle resendOrderToBot pending', () => {
      const state = orderSliceReducer(initialState, { type: resendOrderToBot.pending.type });
      expect(state.loading).toBe(true);
    });

    it('should handle resendOrderToBot fulfilled', () => {
      const state = orderSliceReducer(
        { ...initialState, loading: true },
        { type: resendOrderToBot.fulfilled.type }
      );
      expect(state.loading).toBe(false);
    });

    it('should handle resendOrderToBot rejected', () => {
      const state = orderSliceReducer(
        { ...initialState, loading: true },
        { type: resendOrderToBot.rejected.type, payload: 'Error' }
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error');
    });
  });

  describe('loadOrdersFromStorage thunk', () => {
    it('should load orders from localStorage', async () => {
      const orders: IOrder[] = [
        {
          id: '1',
          number: '0101-001',
          items: [],
          customer: { phone: '+79990000000' },
          delivery: { type: 'pickup', price: 0 },
          total: 100,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('orders', JSON.stringify(orders));

      const action = await loadOrdersFromStorage()(jest.fn(), () => ({}), undefined);

      expect(action.type).toBe('order/loadFromStorage/fulfilled');
      expect(action.payload).toEqual(orders);
    });

    it('should handle loadOrdersFromStorage fulfilled', () => {
      const orders: IOrder[] = [{ id: '1' } as IOrder];
      const state = orderSliceReducer(
        initialState,
        { type: loadOrdersFromStorage.fulfilled.type, payload: orders }
      );
      expect(state.orders).toEqual(orders);
    });

    it('should handle loadOrdersFromStorage rejected', () => {
      const state = orderSliceReducer(
        initialState,
        { type: loadOrdersFromStorage.rejected.type, payload: 'Error' }
      );
      expect(state.error).toBe('Error');
    });
  });
});
