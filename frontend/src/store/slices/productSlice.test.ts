import productReducer, { setCurrentCategory, fetchProducts } from './productSlice';

// Mock fetch
global.fetch = jest.fn();

describe('productSlice', () => {
  const initialState = {
    items: [],
    currentCategory: 'all',
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentCategory', () => {
    const state = productReducer(initialState, setCurrentCategory('pelmeni'));
    expect(state.currentCategory).toBe('pelmeni');
  });

  describe('fetchProducts', () => {
    it('should handle pending state', () => {
      const state = productReducer(initialState, fetchProducts.pending('', undefined));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const mockProducts = [
        { id: '1', name: 'Product 1', price: 100, quantity: 5, description: 'Test', category: 'test', weight: '500g', image: 'test.jpg' },
      ];
      const state = productReducer(
        { ...initialState, loading: true },
        fetchProducts.fulfilled(mockProducts, '', undefined)
      );
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockProducts);
    });

    it('should handle rejected state', () => {
      const state = productReducer(
        { ...initialState, loading: true },
        fetchProducts.rejected(new Error('Failed'), '', undefined, undefined, 'Failed')
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed');
    });
  });
});
