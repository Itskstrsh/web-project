import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './slices/menuSlice.ts';
import cartSlice from './slices/cartSlice.ts';

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;