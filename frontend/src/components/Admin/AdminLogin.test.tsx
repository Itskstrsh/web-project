import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import AdminLogin from './AdminLogin';
import { theme } from '../../theme/theme';
import authReducer from '../../store/slices/authSlice';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { isAuthenticated: false, isLoading: false, error: null } },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('AdminLogin', () => {
  it('renders without crashing', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText('Вход для администратора')).toBeInTheDocument();
  });

  it('displays login title', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText('Вход для администратора')).toBeInTheDocument();
  });

  it('renders password input', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });
});
