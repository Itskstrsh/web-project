import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AdminLogin from './AdminLogin';
import { loginAdmin, clearError } from '../../store/slices/authSlice';

jest.mock('../../hooks/redux', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../store/slices/authSlice', () => ({
  loginAdmin: jest.fn(),
  clearError: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('AdminLogin', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders login form correctly', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    expect(screen.getByText('Вход в админ-панель')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('shows error message when error exists', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: 'Invalid password',
    });

    render(<AdminLogin />);

    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });

  it('updates password input on change', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const passwordInput = screen.getByLabelText('Пароль');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(passwordInput).toHaveValue('testpassword');
  });

  it('toggles password visibility', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const passwordInput = screen.getByLabelText('Пароль');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: '' });
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('submits form with password', async () => {
    const mockUnwrap = jest.fn().mockResolvedValue(undefined);
    (loginAdmin as unknown as jest.Mock).mockReturnValue({ unwrap: mockUnwrap });

    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const passwordInput = screen.getByLabelText('Пароль');
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });

    const submitButton = screen.getByRole('button', { name: /войти/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledWith('admin123');
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('does not submit when password is empty', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(loginAdmin).not.toHaveBeenCalled();
  });

  it('disables inputs when loading', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });

    render(<AdminLogin />);

    expect(screen.getByRole('button', { name: /вход/i })).toBeDisabled();
    expect(screen.getByLabelText('Пароль')).toBeDisabled();
  });

  it('navigates to admin when authenticated', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    expect(mockNavigate).toHaveBeenCalledWith('/admin');
  });

  it('navigates to home when return button clicked', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const returnButton = screen.getByText('Вернуться на главную');
    fireEvent.click(returnButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('clears error on unmount', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    const { unmount } = render(<AdminLogin />);
    unmount();

    expect(clearError).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });

  it('button is disabled when password is empty or whitespace', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    render(<AdminLogin />);

    const submitButton = screen.getByRole('button', { name: /войти/i });
    expect(submitButton).toBeDisabled();

    const passwordInput = screen.getByLabelText('Пароль');
    fireEvent.change(passwordInput, { target: { value: '   ' } });

    expect(submitButton).toBeDisabled();
  });
});
