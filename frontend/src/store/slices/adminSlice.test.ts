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
  type AdminCategory,
} from './adminSlice';

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

  it('should return initial state', () => {
    expect(adminReducer(undefined, { type: 'unknown' })).toEqual(initialState);
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

  describe('getCategoryKey', () => {
    it('should return categoryKey if exists', () => {
      const category: AdminCategory = { id: 1, name: 'Test', categoryKey: 'test-key' };
      expect(getCategoryKey(category)).toBe('test-key');
    });

    it('should generate key from name if no categoryKey', () => {
      const category: AdminCategory = { id: 1, name: 'Test Category' };
      expect(getCategoryKey(category)).toBe('test-category');
    });
  });
});
