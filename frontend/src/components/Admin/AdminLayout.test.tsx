import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import AdminLayout from './AdminLayout';
import { theme } from '../../theme/theme';
import authReducer from '../../store/slices/authSlice';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { isAuthenticated: true, isLoading: false, error: null } },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('AdminLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<AdminLayout />);
    expect(screen.getByText('Панель администратора')).toBeInTheDocument();
  });

  it('displays admin panel title', () => {
    renderWithProviders(<AdminLayout />);
    expect(screen.getByText('Панель администратора')).toBeInTheDocument();
  });

  it('renders home button', () => {
    renderWithProviders(<AdminLayout />);
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });

  it('renders logout button', () => {
    renderWithProviders(<AdminLayout />);
    expect(screen.getByText('Выход')).toBeInTheDocument();
  });

  it('navigates to home when home button clicked', () => {
    renderWithProviders(<AdminLayout />);
    fireEvent.click(screen.getByText('На главную'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders outlet', () => {
    renderWithProviders(<AdminLayout />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
