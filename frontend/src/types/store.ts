export interface AppState {
    menu: {
      isMenuOpen: boolean;
    };
    cart: {
      items: CartItem[];
      total: number;
    };
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface MenuItem {
    label: string;
    href: string;
  }