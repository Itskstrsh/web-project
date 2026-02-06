import { configureStore, type Middleware } from '@reduxjs/toolkit';
import type { AdminState } from './slices/adminSlice';
import adminReducer from './slices/adminSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice'; 
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import productsReducer from './slices/productSlice';

const adminPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if ((action as any)?.type?.startsWith('admin/')) {
    const state = store.getState();
    const adminState: AdminState = state.admin;
    
    try {
      const stateToSave = {
        products: adminState.products,
        categories: adminState.categories,
        deletedBaseCategoryIds: adminState.deletedBaseCategoryIds,
      };
      localStorage.setItem('adminState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving admin state to localStorage:', error);
    }
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    menu: menuReducer,
    admin: adminReducer,
    auth: authReducer,
    cart: cartReducer, 
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;