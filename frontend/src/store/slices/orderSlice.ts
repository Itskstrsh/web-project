// store/slices/orderSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICartItem } from './cartSlice';

export interface IOrder {
  id: string;
  number: string;
  items: ICartItem[];
  customer: {
    phone: string;
    name?: string;
  };
  delivery: {
    type: 'pickup' | 'courier';
    address?: string;
    price: number;
  };
  total: number;
  status: 'pending' | 'confirmed' | 'in_work' | 'ready_for_pickup' | 'delivering' | 'completed' | 'cancelled';
  comments?: string;
  createdAt: string;
  paymentMethod?: 'cash' | 'card' | 'online';
  pendingAt?: string;
  confirmedAt?: string;
  in_workAt?: string;
  ready_for_pickupAt?: string;
  deliveringAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

interface OrderState {
  orders: IOrder[];
  currentOrder: IOrder | null;
  loading: boolean;
  error: string | null;
}

// Явно объявляем initialState
const initialState: OrderState = {
  orders: JSON.parse(localStorage.getItem('orders') || '[]'),
  currentOrder: null,
  loading: false,
  error: null,
};

const generateOrderNumber = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${day}${month}-${random}`;
};

// Функция отправки заказа в Telegram бот администратора
const sendToAdminBot = async (order: IOrder): Promise<{ success: boolean }> => {
  try {
    // URL вашего бота (локально при разработке)
    const botWebhookUrl = import.meta.env.VITE_BOT_WEBHOOK_URL || 'http://localhost:3000/webhook/order';
    
    console.log('🔄 Пытаюсь отправить заказ в бот...', {
      url: botWebhookUrl,
      orderNumber: order.number
    });
    
    const response = await fetch(botWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...order,
        // Добавляем timestamp для статуса pending
        pendingAt: order.pendingAt || new Date().toISOString()
      }),
    });
    
    console.log('📥 Ответ от бота:', {
      status: response.status,
      ok: response.ok
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Ошибка HTTP от бота:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Ответ JSON от бота:', result);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Критическая ошибка отправки в бот:', error);
    // Не прерываем процесс - заказ сохранится локально
    return { success: false };
  }
};

// Thunk для создания заказа (ОСНОВНАЯ ФУНКЦИЯ)
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData: Omit<IOrder, 'id' | 'number' | 'status' | 'createdAt' | 'pendingAt'>, { rejectWithValue }) => {
    try {
      const order: IOrder = {
        ...orderData,
        id: Date.now().toString(),
        number: generateOrderNumber(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        pendingAt: new Date().toISOString(),
      };

      console.log('📝 Создаю заказ:', {
        number: order.number,
        phone: order.customer.phone,
        total: order.total,
        items: order.items.length
      });

      // 1. Сохраняем локально
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      console.log('💾 Заказ сохранен локально:', order.number);

      // 2. Пытаемся отправить в Telegram бот администратора
      try {
        await sendToAdminBot(order);
        console.log('✅ Заказ отправлен в бот');
      } catch (botError) {
        console.warn('⚠️ Бот администратора недоступен, но заказ сохранен локально:', botError);
      }

      return order;
    } catch (error: any) {
      console.error('❌ Ошибка создания заказа:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Дополнительный Thunk для отправки существующего заказа в бот
export const resendOrderToBot = createAsyncThunk(
  'order/resendToBot',
  async (orderId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { order: OrderState };
      const order = state.order.orders.find(o => o.id === orderId);
      
      if (!order) {
        throw new Error('Заказ не найден');
      }
      
      const result = await sendToAdminBot(order);
      
      if (!result.success) {
        throw new Error('Не удалось отправить в бот');
      }
      
      return { orderId, success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для загрузки заказов из localStorage
export const loadOrdersFromStorage = createAsyncThunk(
  'order/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState, // Используем объявленный initialState
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.currentOrder = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      localStorage.removeItem('orders');
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: IOrder['status'] }>) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      
      if (order) {
        const oldStatus = order.status;
        order.status = status;
        
        // Добавляем timestamp для нового статуса
        const statusKey = `${status}At` as keyof IOrder;
        if (statusKey in order) {
          (order as any)[statusKey] = new Date().toISOString();
        }
        
        // Обновляем в localStorage
        localStorage.setItem('orders', JSON.stringify(state.orders));
        
        console.log(`🔄 Статус заказа #${order.number} изменен: ${oldStatus} → ${status}`);
      }
    },
    // Вспомогательный редьюсер для тестирования
    addTestOrder: (state) => {
      const testOrder: IOrder = {
        id: Date.now().toString(),
        number: generateOrderNumber(),
        items: [
          { 
            id: '1', 
            name: 'Тестовый товар', 
            price: 100, 
            quantity: 2,
            weight: 500,
            imageUrl: ''
          }
        ],
        customer: {
          phone: '+79991234567',
          name: 'Тестовый клиент'
        },
        delivery: {
          type: 'pickup',
          price: 0
        },
        total: 200,
        status: 'pending',
        createdAt: new Date().toISOString(),
        pendingAt: new Date().toISOString(),
        paymentMethod: 'cash'
      };
      
      state.orders.push(testOrder);
      localStorage.setItem('orders', JSON.stringify(state.orders));
      
      console.log('🧪 Тестовый заказ добавлен:', testOrder.number);
    }
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
        console.log('✅ Заказ создан и добавлен в state:', action.payload.number);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('❌ Ошибка создания заказа:', action.payload);
      })
      
      // resendOrderToBot
      .addCase(resendOrderToBot.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOrderToBot.fulfilled, (state) => {
        state.loading = false;
        console.log('✅ Заказ переотправлен в бот');
      })
      .addCase(resendOrderToBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // loadOrdersFromStorage
      .addCase(loadOrdersFromStorage.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log(`📦 Загружено ${action.payload.length} заказов из localStorage`);
      })
      .addCase(loadOrdersFromStorage.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCurrentOrder, 
  clearOrders, 
  updateOrderStatus,
  addTestOrder 
} = orderSlice.actions;

export default orderSlice.reducer;