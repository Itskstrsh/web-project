import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import App from './App';

// Мокаем все зависимости
jest.mock('./hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('./router/AppRouter', () => ({
  __esModule: true,
  default: () => <div data-testid="app-router">AppRouter</div>,
}));

jest.mock('./screen/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));

jest.mock('./screen/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('./components/Cart/Cart', () => ({
  __esModule: true,
  default: () => <div data-testid="cart">Cart</div>,
}));

jest.mock('./components/Order/OrderSuccessModal', () => ({
  __esModule: true,
  default: () => <div data-testid="order-success-modal">OrderSuccessModal</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('App', () => {
  const mockUseLocation = useLocation as jest.Mock;
  const mockUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockImplementation((selector) => {
      const state = { cart: { isOpen: false } };
      return selector(state);
    });
  });

  it('renders without crashing', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });
    render(<App />);
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });

  it('renders Header and Footer on non-admin routes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
    expect(screen.getByTestId('order-success-modal')).toBeInTheDocument();
  });

  it('does not render Header and Footer on /admin route', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin' });
    render(<App />);

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });

  it('does not render Header and Footer on nested admin routes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/admin/products' });
    render(<App />);

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('applies pointerEvents none when cart is open', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = { cart: { isOpen: true } };
      return selector(state);
    });
    mockUseLocation.mockReturnValue({ pathname: '/' });

    render(<App />);

    const appDiv = screen.getByTestId('app-router').parentElement;
    expect(appDiv).toHaveStyle({ pointerEvents: 'none' });
  });

  it('applies pointerEvents auto when cart is closed', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = { cart: { isOpen: false } };
      return selector(state);
    });
    mockUseLocation.mockReturnValue({ pathname: '/' });

    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toHaveStyle({ pointerEvents: 'auto' });
  });
});
