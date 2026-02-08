import { render } from '@testing-library/react';
import App from './App';

// Базовый мок для проверки, что App рендерится без ошибок
jest.mock('./router/AppRouter', () => ({
  __esModule: true,
  default: () => <div data-testid="app-router">AppRouter</div>,
}));

jest.mock('./components/Order/OrderSuccessModal', () => ({
  __esModule: true,
  default: () => <div data-testid="order-success-modal">OrderSuccessModal</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('order-success-modal')).toBeInTheDocument();
  });
});
