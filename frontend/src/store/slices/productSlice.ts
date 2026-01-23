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

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Ошибка загрузки продуктов');
      }
      
      const products = await response.json();
      
      // Преобразуем данные с сервера
      return products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.stock || 0,
        description: product.about,
        category: product.category?.name || product.category || 'pelmeni',
        weight: product.calories,
        // Используйте поле image, которое приходит с сервера
        image: product.image, // ← Важно: используйте то же поле
      }));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки');
    }
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
