import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import { theme } from '../theme/theme';
import cartReducer from '../store/slices/cartSlice';

jest.mock('../components/Header/HeaderLogo', () => ({
  __esModule: true,
  HeaderLogo: () => <div data-testid="header-logo">Logo</div>,
}));

jest.mock('../components/Header/HeaderNav', () => ({
  __esModule: true,
  default: () => <div data-testid="header-nav">Nav</div>,
}));

jest.mock('../components/Header/HeaderPhone', () => ({
  __esModule: true,
  default: () => <div data-testid="header-phone">Phone</div>,
}));

jest.mock('../components/Header/Drawer', () => ({
  __esModule: true,
  default: ({ menuItems }: { menuItems: any[] }) => (
    <div data-testid="header-drawer">Drawer ({menuItems.length} items)</div>
  ),
}));

jest.mock('../components/Cart/CartIcon', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-icon">Cart</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: [], isOpen: false, total: 0 } },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe.skip('Header', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('displays header logo', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('displays header navigation', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-nav')).toBeInTheDocument();
  });

  it('displays header phone', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-phone')).toBeInTheDocument();
  });

  it('displays cart icon', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  it('displays mobile drawer', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-drawer')).toBeInTheDocument();
  });
});
