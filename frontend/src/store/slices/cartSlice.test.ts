import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
  type ICartItem,
} from './cartSlice';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('cartSlice', () => {
  const initialState = {
    items: [],
    isOpen: false,
    total: 0,
  };

  const mockItem: ICartItem = {
    id: '1',
    name: 'Test Product',
    price: 100,
    quantity: 1,
    weight: 500,
    imageUrl: 'test.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const state = cartReducer(initialState, addToCart(mockItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem);
    expect(state.total).toBe(100);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should increment quantity when adding existing item', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const updatedState = cartReducer(stateWithItem, addToCart(mockItem));
    expect(updatedState.items).toHaveLength(1);
    expect(updatedState.items[0].quantity).toBe(2);
    expect(updatedState.total).toBe(200);
  });

  it('should remove item from cart', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const updatedState = cartReducer(stateWithItem, removeFromCart(mockItem.id));
    expect(updatedState.items).toHaveLength(0);
    expect(updatedState.total).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should update quantity', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const updatedState = cartReducer(stateWithItem, updateQuantity({ id: mockItem.id, quantity: 3 }));
    expect(updatedState.items[0].quantity).toBe(3);
    expect(updatedState.total).toBe(300);
  });

  it('should remove item when quantity updated to 0', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const updatedState = cartReducer(stateWithItem, updateQuantity({ id: mockItem.id, quantity: 0 }));
    expect(updatedState.items).toHaveLength(0);
  });

  it('should remove item when quantity updated to negative', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const updatedState = cartReducer(stateWithItem, updateQuantity({ id: mockItem.id, quantity: -1 }));
    expect(updatedState.items).toHaveLength(0);
  });

  it('should clear cart', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockItem));
    const clearedState = cartReducer(stateWithItem, clearCart());
    expect(clearedState.items).toHaveLength(0);
    expect(clearedState.total).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith('cart');
  });

  it('should toggle cart open state', () => {
    const openState = cartReducer(initialState, toggleCart());
    expect(openState.isOpen).toBe(true);
    const closedState = cartReducer(openState, toggleCart());
    expect(closedState.isOpen).toBe(false);
  });

  it('should close cart', () => {
    const openState = { ...initialState, isOpen: true };
    const closedState = cartReducer(openState, closeCart());
    expect(closedState.isOpen).toBe(false);
  });

  it('should handle updateQuantity for non-existing item', () => {
    const state = cartReducer(initialState, updateQuantity({ id: 'non-existing', quantity: 5 }));
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });
});
