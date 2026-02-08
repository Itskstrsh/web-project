import adminReducer, {
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
  getCategoryKey,
  createProductOnServer,
  deleteProductOnServer,
  type AdminCategory,
} from './adminSlice';

const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe('adminSlice', () => {
  const initialState = {
    products: [],
    categories: [],
    searchQuery: '',
    selectedCategory: null,
    deletedBaseCategoryIds: [],
    loading: false,
    error: null,
  };

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    quantity: 5,
    description: 'Test Description',
    category: 'test',
    weight: '500g',
    image: 'test.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should handle setProducts', () => {
    const state = adminReducer(initialState, setProducts([mockProduct]));
    expect(state.products).toEqual([mockProduct]);
  });

  it('should handle addProduct', () => {
    const state = adminReducer(initialState, addProduct(mockProduct));
    expect(state.products).toHaveLength(1);
    expect(state.products[0]).toEqual(mockProduct);
  });

  it('should handle updateProduct', () => {
    const stateWithProduct = adminReducer(initialState, addProduct(mockProduct));
    const updatedProduct = { ...mockProduct, name: 'Updated Name' };
    const state = adminReducer(stateWithProduct, updateProduct(updatedProduct));
    expect(state.products[0].name).toBe('Updated Name');
  });

  it('should handle updateProduct when product not found', () => {
    const state = adminReducer(initialState, updateProduct(mockProduct));
    expect(state.products).toHaveLength(0);
  });

  it('should handle deleteProduct', () => {
    const stateWithProduct = adminReducer(initialState, addProduct(mockProduct));
    const state = adminReducer(stateWithProduct, deleteProduct('1'));
    expect(state.products).toHaveLength(0);
  });

  it('should handle updateProductQuantity', () => {
    const stateWithProduct = adminReducer(initialState, addProduct(mockProduct));
    const state = adminReducer(stateWithProduct, updateProductQuantity({ id: '1', quantity: 10 }));
    expect(state.products[0].quantity).toBe(10);
  });

  it('should handle updateProductQuantity when product not found', () => {
    const state = adminReducer(initialState, updateProductQuantity({ id: 'nonexistent', quantity: 10 }));
    expect(state.products).toHaveLength(0);
  });

  it('should handle setSearchQuery', () => {
    const state = adminReducer(initialState, setSearchQuery('test query'));
    expect(state.searchQuery).toBe('test query');
  });

  it('should handle setSelectedCategory', () => {
    const state = adminReducer(initialState, setSelectedCategory(5));
    expect(state.selectedCategory).toBe(5);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = adminReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });

  describe('category reducers', () => {
    it('should handle addCategory', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      const state = adminReducer(initialState, addCategory(category));
      expect(state.categories).toHaveLength(1);
      expect(state.categories[0]).toEqual(category);
    });

    it('should not add duplicate category', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      const stateWithCategory = adminReducer(initialState, addCategory(category));
      const state = adminReducer(stateWithCategory, addCategory(category));
      expect(state.categories).toHaveLength(1);
    });

    it('should handle updateCategory', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      const stateWithCategory = adminReducer(initialState, addCategory(category));
      const updatedCategory: AdminCategory = { id: 1, name: 'Updated Category', categoryKey: 'updated' };
      const state = adminReducer(stateWithCategory, updateCategory(updatedCategory));
      expect(state.categories[0].name).toBe('Updated Category');
    });

    it('should add categoryKey when updating category without it', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      const stateWithCategory = adminReducer(initialState, addCategory(category));
      const updatedCategory: AdminCategory = { id: 1, name: 'Updated Category' };
      const state = adminReducer(stateWithCategory, updateCategory(updatedCategory));
      expect(state.categories[0].categoryKey).toBeDefined();
    });

    it('should handle updateCategory when category not found', () => {
      const category: AdminCategory = { id: 99, name: 'Nonexistent', categoryKey: 'none' };
      const state = adminReducer(initialState, updateCategory(category));
      expect(state.categories).toHaveLength(0);
    });

    it('should handle deleteCategory', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      const stateWithCategory = adminReducer(initialState, addCategory(category));
      const state = adminReducer(stateWithCategory, deleteCategory(1));
      expect(state.categories).toHaveLength(0);
    });

    it('should reset selectedCategory when deleted category was selected', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category', categoryKey: 'test' };
      let state = adminReducer(initialState, addCategory(category));
      state = adminReducer(state, setSelectedCategory(1));
      state = adminReducer(state, deleteCategory(1));
      expect(state.selectedCategory).toBeNull();
    });
  });

  describe('getCategoryKey', () => {
    it('should return categoryKey if exists', () => {
      const category: AdminCategory = { id: 1, name: 'Test', categoryKey: 'test-key' };
      expect(getCategoryKey(category)).toBe('test-key');
    });

    it('should generate key from name if no categoryKey', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category' };
      expect(getCategoryKey(category)).toBe('test-category');
    });

    it('should handle name with multiple spaces', () => {
      const category: AdminCategory = { id: 1, name: 'Test   Category   Name' };
      // Регулярное выражение /\s+/ заменяет несколько пробелов на один дефис
      expect(getCategoryKey(category)).toBe('test-category-name');
    });
  });

  describe('createProductOnServer thunk', () => {
    it('should handle createProductOnServer pending', () => {
      const state = adminReducer(initialState, { type: createProductOnServer.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle createProductOnServer fulfilled', () => {
      const newProduct = { ...mockProduct, id: '2' };
      const state = adminReducer(
        { ...initialState, loading: true },
        { type: createProductOnServer.fulfilled.type, payload: newProduct }
      );
      expect(state.loading).toBe(false);
      expect(state.products).toContainEqual(newProduct);
    });

    it('should handle createProductOnServer rejected', () => {
      const state = adminReducer(
        { ...initialState, loading: true },
        { type: createProductOnServer.rejected.type, payload: 'Error creating product' }
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error creating product');
    });
  });

  describe('deleteProductOnServer thunk', () => {
    it('should handle deleteProductOnServer pending', () => {
      const state = adminReducer(initialState, { type: deleteProductOnServer.pending.type });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle deleteProductOnServer fulfilled', () => {
      const stateWithProduct = adminReducer(initialState, addProduct(mockProduct));
      const state = adminReducer(
        { ...stateWithProduct, loading: true },
        { type: deleteProductOnServer.fulfilled.type, payload: '1' }
      );
      expect(state.loading).toBe(false);
      expect(state.products).toHaveLength(0);
    });

    it('should handle deleteProductOnServer rejected', () => {
      const state = adminReducer(
        { ...initialState, loading: true },
        { type: deleteProductOnServer.rejected.type, payload: 'Error deleting product' }
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error deleting product');
    });
  });
});
