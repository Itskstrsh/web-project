import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  weight?: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: ICartItem[];
  isOpen: boolean;
  total: number; 
}

const loadCartFromStorage = (): { items: ICartItem[], total: number } => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  const saved = localStorage.getItem('cart');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.total !== undefined) {
      return parsed;
    } else {
      const total = parsed.items?.reduce((sum: number, item: ICartItem) => 
        sum + (item.price || 0) * item.quantity, 0) || 0;
      return { items: parsed.items || [], total };
    }
  }
  return { items: [], total: 0 };
};

const savedCart = loadCartFromStorage();

const initialState: CartState = {
  items: savedCart.items,
  isOpen: false,
  total: savedCart.total,
};

const calculateTotal = (items: ICartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<ICartItem, 'quantity'>>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      state.total = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity < 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.total = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart,
  closeCart 
} = cartSlice.actions;

export default cartSlice.reducer;