import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

export interface AdminCategory {
  id: number;
  name: string;
  image?: string;
  categoryKey?: string;
}

const baseCategoriesConfig = [
  { id: 1, name: 'Пельмени', categoryKey: 'pelmeni' },
  { id: 2, name: 'Вареники', categoryKey: 'vareniki' },
  { id: 3, name: 'Выпечка', categoryKey: 'bakery' },
  { id: 4, name: 'Десерты', categoryKey: 'desserts' },
  { id: 5, name: 'Полуфабрикаты', categoryKey: 'polupoker' },
  { id: 6, name: 'ГОТОВАЯ ЕДА', categoryKey: 'ready' },
  { id: 7, name: 'ПИЦЦА', categoryKey: 'pizza' },
];

// Вспомогательная функция для получения ключа категории
export const getCategoryKey = (category: AdminCategory): string => {
  return category.categoryKey || category.name.toLowerCase().replace(/\s+/g, '-');
};

export interface AdminState {
  products: Product[];
  categories: AdminCategory[];
  searchQuery: string;
  selectedCategory: number | null;
  deletedBaseCategoryIds: number[];
}

// Функция для загрузки данных из localStorage
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

// Загружаем сохраненные данные
const savedState = loadAdminStateFromStorage();

// Функция для получения базовых категорий
const getBaseCategories = (): AdminCategory[] => {
  return baseCategoriesConfig.map((cat) => ({
    id: cat.id,
    name: cat.name,
    categoryKey: cat.categoryKey,
  }));
};

// Создаем базовые категории с правильными типами
const baseCategories: AdminCategory[] = getBaseCategories();

// Объединяем базовые категории с сохраненными
// Исключаем базовые категории, которые были удалены
const deletedBaseCategoryIds = savedState?.deletedBaseCategoryIds || [];
const activeBaseCategories = baseCategories.filter(
  cat => !deletedBaseCategoryIds.includes(cat.id)
);

let mergedCategories: AdminCategory[] = [];

if (savedState?.categories && Array.isArray(savedState.categories)) {
  const savedCategories = savedState.categories as AdminCategory[];
  const savedCategoryIds = new Set<number>(savedCategories.map(c => c.id));
  
  // Сначала добавляем сохраненные категории (они имеют приоритет - включают переименования)
  mergedCategories = [...savedCategories];
  
  // Затем добавляем базовые категории, которых нет в сохраненных (новые базовые категории)
  activeBaseCategories.forEach(baseCat => {
    if (!savedCategoryIds.has(baseCat.id)) {
      mergedCategories.push(baseCat);
    }
  });
} else {
  // Если нет сохраненных данных, используем только базовые категории
  mergedCategories = [...activeBaseCategories];
}

const initialState: AdminState = {
  products: savedState?.products || [],
  categories: mergedCategories,
  searchQuery: '',
  selectedCategory: null,
  deletedBaseCategoryIds: deletedBaseCategoryIds,
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
      // Проверяем, не пытаемся ли мы добавить базовую категорию, которая была удалена
      const baseCats = getBaseCategories();
      const isBaseCategory = baseCats.some(c => c.id === newCategory.id);
      if (isBaseCategory && state.deletedBaseCategoryIds.includes(newCategory.id)) {
        // Если это удаленная базовая категория, восстанавливаем её
        state.deletedBaseCategoryIds = state.deletedBaseCategoryIds.filter(id => id !== newCategory.id);
      }
      // Проверяем, нет ли уже такой категории
      if (!state.categories.some(c => c.id === newCategory.id)) {
        state.categories.push(newCategory);
      }
    },
    updateCategory: (state, action: PayloadAction<AdminCategory>) => {
      const updatedCategory = action.payload;
      const index = state.categories.findIndex((c) => c.id === updatedCategory.id);
      if (index !== -1) {
        // Если categoryKey не указан, генерируем его из названия
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
      // Если удаляется базовая категория, добавляем её ID в список удаленных
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
} = adminSlice.actions;

export default adminSlice.reducer;