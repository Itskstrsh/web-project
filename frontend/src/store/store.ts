// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice'; // Добавьте если у вас есть
import productsReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer, // Убедитесь что это есть
    menu: menuReducer, // И это
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;