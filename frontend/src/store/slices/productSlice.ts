import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

interface ProductsState {
  items: Product[];
  currentCategory: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  currentCategory: 'all',
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Ошибка загрузки');
    return res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка';
      });
  },
});

export const { setCurrentCategory } = productsSlice.actions;
export default productsSlice.reducer;
