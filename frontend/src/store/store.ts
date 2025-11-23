// store/index.ts
import { configureStore, type Middleware } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import menuReducer from './slices/menuSlice'; // Добавьте если у вас есть
import productsReducer from './slices/productSlice';
import type { AdminState } from './slices/adminSlice';

// Middleware для сохранения admin state в localStorage
const adminPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Сохраняем только если действие относится к admin slice
  if (action.type?.startsWith('admin/')) {
    const state = store.getState();
    const adminState: AdminState = state.admin;
    
    // Сохраняем products, categories и deletedBaseCategoryIds
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
    products: productsReducer, // Убедитесь что это есть
    menu: menuReducer, // И это
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;