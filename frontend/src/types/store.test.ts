import type { AppState, CartItem, MenuItem } from './store';

describe('Store types', () => {
  it('should have valid AppState interface', () => {
    const appState: AppState = {
      menu: { isMenuOpen: false },
      cart: {
        items: [],
        total: 0,
      },
    };
    expect(appState.menu.isMenuOpen).toBe(false);
    expect(appState.cart.items).toEqual([]);
    expect(appState.cart.total).toBe(0);
  });

  it('should have valid CartItem interface', () => {
    const cartItem: CartItem = {
      id: '1',
      name: 'Test Item',
      price: 100,
      quantity: 2,
    };
    expect(cartItem.id).toBe('1');
    expect(cartItem.name).toBe('Test Item');
    expect(cartItem.price).toBe(100);
    expect(cartItem.quantity).toBe(2);
  });

  it('should have valid MenuItem interface', () => {
    const menuItem: MenuItem = {
      label: 'Home',
      href: '/',
    };
    expect(menuItem.label).toBe('Home');
    expect(menuItem.href).toBe('/');
  });
});
