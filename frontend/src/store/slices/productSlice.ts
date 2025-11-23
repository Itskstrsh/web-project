import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { products } from '../../../data/product'; // Импортируем данные
import type { Product } from '../../types/product'; // Импортируем тип

// Используем импортированный тип
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

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  'products/fetchAll',
  async (_, { getState }) => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        // Получаем товары из админки
        const adminProducts = getState().admin.products;
        
        // Создаем Map для быстрого поиска по id
        const productsMap = new Map<string, Product>();
        
        // Сначала добавляем базовые товары
        products.forEach(product => {
          productsMap.set(product.id, product);
        });
        
        // Затем добавляем/обновляем товары из админки (они имеют приоритет)
        adminProducts.forEach(adminProduct => {
          productsMap.set(adminProduct.id, adminProduct);
        });
        
        // Преобразуем Map обратно в массив
        const allProducts = Array.from(productsMap.values());
        
        resolve(allProducts);
      }, 300);
    });
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export const { setCurrentCategory } = productsSlice.actions;
export default productsSlice.reducer;