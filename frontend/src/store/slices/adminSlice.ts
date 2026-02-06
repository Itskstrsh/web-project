import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import { fetchProducts } from './productSlice';

export interface AdminCategory {
  id: number;
  name: string;
  image?: string;
  categoryKey?: string;
}
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Файл должен быть изображением'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      const base64String = reader.result as string;
      
      if (base64String.length > 7 * 1024 * 1024) { 
        reject(new Error('Размер изображения слишком большой (максимум ~5MB)'));
      } else {
        resolve(base64String);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'));
    };
    
    reader.readAsDataURL(file);
  });
};

const baseCategoriesConfig = [
  { id: 1, name: 'Пельмени', categoryKey: 'pelmeni' },
  { id: 2, name: 'Вареники', categoryKey: 'vareniki' },
  { id: 3, name: 'Выпечка', categoryKey: 'bakery' },
  { id: 4, name: 'Десерты', categoryKey: 'desserts' },
  { id: 5, name: 'Полуфабрикаты', categoryKey: 'polupoker' },
  { id: 6, name: 'ГОТОВАЯ ЕДА', categoryKey: 'ready' },
  { id: 7, name: 'ПИЦЦА', categoryKey: 'pizza' },
];

export const getCategoryKey = (category: AdminCategory): string => {
  return category.categoryKey || category.name.toLowerCase().replace(/\s+/g, '-');
};

export interface AdminState {
  products: Product[];
  categories: AdminCategory[];
  searchQuery: string;
  selectedCategory: number | null;
  deletedBaseCategoryIds: number[];
  loading: boolean;
  error: string | null;
}

export const createProductOnServer = createAsyncThunk(
  'admin/createProductOnServer',
  async ({ 
    productData, 
    imageFile 
  }: { 
    productData: Omit<Product, 'id'>;
    imageFile?: File;
  }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      let imageBase64 = '';
      
      if (imageFile) {
        console.log('Начинаю конвертацию файла в base64...');
        const startTime = Date.now();
        imageBase64 = await convertFileToBase64(imageFile);
        const convertTime = Date.now() - startTime;
        console.log(`Конвертация заняла ${convertTime}ms`);
      }

      const backendProductData: any = {
        name: productData.name || "Новый продукт",
        about: productData.description || "Описание продукта",
        price: productData.price || 0,
        calories: productData.weight || "",
        category: productData.category || "pelmeni",
        stock: productData.quantity || 0,
        image: null,
      };

      if (imageBase64) {
        backendProductData.imageBase64 = imageBase64;
      }

      console.log('Отправляю запрос на сервер...');
      
      const response = await fetch('/api/admin/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(backendProductData),
      });

      console.log('Статус ответа:', response.status);

      const responseText = await response.text();
      console.log('Ответ сервера:', responseText);

      if (!response.ok) {
        let errorMessage = `Ошибка ${response.status}: `;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage += errorData.message || errorData.error || response.statusText;
        } catch {
          errorMessage += responseText || response.statusText;
        }
        throw new Error(errorMessage);
      }

      const createdProduct = JSON.parse(responseText);
      console.log('Продукт успешно создан:', createdProduct);
      
      return {
        id: createdProduct.id,
        name: createdProduct.name,
        price: createdProduct.price,
        quantity: createdProduct.stock || 0,
        description: createdProduct.about,
        category: createdProduct.category?.name || createdProduct.category,
        weight: createdProduct.calories,
        image: createdProduct.image, 
      } as Product; 
      
    } catch (error) {
      console.error('Полная ошибка при создании продукта:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка при создании продукта');
    }
  }
);

export const deleteProductOnServer = createAsyncThunk(
  'admin/deleteProductOnServer',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      console.log('Удаление продукта с ID:', id);

      const response = await fetch(`/api/admin/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Статус ответа при удалении:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка удаления: ${errorText}`);
      }

      dispatch(fetchProducts());
      
      return id; 
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка удаления продукта');
    }
  }
);

const loadAdminStateFromStorage = (): Partial<AdminState> | null => {
  try {
    const savedState = localStorage.getItem('adminState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading admin state from localStorage:', error);
  }
  return null;
};

const savedState = loadAdminStateFromStorage();

const getBaseCategories = (): AdminCategory[] => {
  return baseCategoriesConfig.map((cat) => ({
    id: cat.id,
    name: cat.name,
    categoryKey: cat.categoryKey,
  }));
};

const baseCategories: AdminCategory[] = getBaseCategories();

const deletedBaseCategoryIds = savedState?.deletedBaseCategoryIds || [];
const activeBaseCategories = baseCategories.filter(
  cat => !deletedBaseCategoryIds.includes(cat.id)
);

let mergedCategories: AdminCategory[] = [];

if (savedState?.categories && Array.isArray(savedState.categories)) {
  const savedCategories = savedState.categories as AdminCategory[];
  const savedCategoryIds = new Set<number>(savedCategories.map(c => c.id));
  
  mergedCategories = [...savedCategories];
  
  activeBaseCategories.forEach(baseCat => {
    if (!savedCategoryIds.has(baseCat.id)) {
      mergedCategories.push(baseCat);
    }
  });
} else {
  mergedCategories = [...activeBaseCategories];
}

const initialState: AdminState = {
  products: savedState?.products || [],
  categories: mergedCategories,
  searchQuery: '',
  selectedCategory: null,
  deletedBaseCategoryIds: deletedBaseCategoryIds,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProductQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    addCategory: (state, action: PayloadAction<AdminCategory>) => {
      const newCategory = action.payload;
      const baseCats = getBaseCategories();
      const isBaseCategory = baseCats.some(c => c.id === newCategory.id);
      if (isBaseCategory && state.deletedBaseCategoryIds.includes(newCategory.id)) {
        state.deletedBaseCategoryIds = state.deletedBaseCategoryIds.filter(id => id !== newCategory.id);
      }
      if (!state.categories.some(c => c.id === newCategory.id)) {
        state.categories.push(newCategory);
      }
    },
    updateCategory: (state, action: PayloadAction<AdminCategory>) => {
      const updatedCategory = action.payload;
      const index = state.categories.findIndex((c) => c.id === updatedCategory.id);
      if (index !== -1) {
        if (!updatedCategory.categoryKey) {
          updatedCategory.categoryKey = getCategoryKey(updatedCategory);
        }
        state.categories[index] = updatedCategory;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter((c) => c.id !== categoryId);
      if (state.selectedCategory === categoryId) {
        state.selectedCategory = null;
      }
      const baseCats = getBaseCategories();
      const isBaseCategory = baseCats.some(c => c.id === categoryId);
      if (isBaseCategory && !state.deletedBaseCategoryIds.includes(categoryId)) {
        state.deletedBaseCategoryIds.push(categoryId);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductOnServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductOnServer.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductOnServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductOnServer.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProductOnServer.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p.id !== action.payload);
    })
    .addCase(deleteProductOnServer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
  addCategory,
  updateCategory,
  deleteCategory,
  setSearchQuery,
  setSelectedCategory,
  clearError,
} = adminSlice.actions;

export default adminSlice.reducer;