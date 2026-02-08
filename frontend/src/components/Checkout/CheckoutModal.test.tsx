import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutModal from './CheckoutModal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createOrder } from '../../store/slices/orderSlice';

jest.mock('../../hooks/redux', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../store/slices/cartSlice', () => ({
  clearCart: jest.fn(),
  closeCart: jest.fn(),
}));

jest.mock('../../store/slices/orderSlice', () => ({
  createOrder: jest.fn(),
}));

const mockAlert = jest.fn();
window.alert = mockAlert;

describe('CheckoutModal', () => {
  const mockDispatch = jest.fn();
  const mockOnClose = jest.fn();

  const mockCartItems = [
    { id: '1', name: 'Пельмени', price: 500, quantity: 2, weight: 500, imageUrl: '' },
    { id: '2', name: 'Вареники', price: 400, quantity: 1, weight: 400, imageUrl: '' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });
  });

  it('renders without crashing', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    expect(screen.getByText('Оформление заказа')).toBeInTheDocument();
  });

  it('renders step 1 with contact information', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    expect(screen.getByText('Контактная информация')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+7 (999) 123-45-67')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Как к вам обращаться?')).toBeInTheDocument();
  });

  it('updates phone input', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    expect(phoneInput).toHaveValue('+79991234567');
  });

  it('updates name input', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const nameInput = screen.getByPlaceholderText('Как к вам обращаться?');
    fireEvent.change(nameInput, { target: { value: 'Иван' } });
    expect(nameInput).toHaveValue('Иван');
  });

  it('proceeds to step 2 when phone is entered', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });

    fireEvent.click(screen.getByText('Продолжить'));
    expect(screen.getByText('Способ получения')).toBeInTheDocument();
  });

  it('shows alert when phone is empty and trying to proceed', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Продолжить'));
    expect(mockAlert).toHaveBeenCalledWith('Пожалуйста, введите номер телефона');
  });

  it('renders step 2 with delivery options', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));

    expect(screen.getByText('Самовывоз')).toBeInTheDocument();
    expect(screen.getByText('Доставка курьером')).toBeInTheDocument();
    expect(screen.getByText('Бесплатно')).toBeInTheDocument();
    expect(screen.getByText('200 ₽')).toBeInTheDocument();
  });

  it('selects courier delivery and shows address field', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));

    const courierRadio = screen.getByDisplayValue('courier');
    fireEvent.click(courierRadio);

    expect(screen.getByPlaceholderText('Улица, дом, квартира')).toBeInTheDocument();
  });

  it('navigates back from step 2 to step 1', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));

    fireEvent.click(screen.getByText('Назад'));
    expect(screen.getByText('Контактная информация')).toBeInTheDocument();
  });

  it('proceeds to step 3 from step 2', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    expect(screen.getByText('Оплата и подтверждение')).toBeInTheDocument();
  });

  it('renders step 3 with payment options', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    expect(screen.getByText('Наличные')).toBeInTheDocument();
    expect(screen.getByText('Картой')).toBeInTheDocument();
    expect(screen.getByText('Итого к оплате')).toBeInTheDocument();
  });

  it('updates payment method', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    const cardRadio = screen.getByDisplayValue('card');
    fireEvent.click(cardRadio);

    expect(cardRadio).toBeChecked();
  });

  it('updates comments', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    const commentsTextarea = screen.getByPlaceholderText('Пожелания, особенности доставки...');
    fireEvent.change(commentsTextarea, { target: { value: 'Быстрее, пожалуйста' } });

    expect(commentsTextarea).toHaveValue('Быстрее, пожалуйста');
  });

  it('closes modal on X button click', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('✕'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes modal on overlay click', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    const { container } = render(<CheckoutModal onClose={mockOnClose} />);
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('submits order successfully', async () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    const mockUnwrap = jest.fn().mockResolvedValue({ id: '1', number: '0101-001' });
    (createOrder as unknown as jest.Mock).mockReturnValue({ unwrap: mockUnwrap });

    render(<CheckoutModal onClose={mockOnClose} />);

    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Подтвердить заказ'));

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith(expect.objectContaining({
        items: mockCartItems,
        customer: { phone: '+79991234567' },
        total: 1400,
        paymentMethod: 'cash',
      }));
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows loading state during submission', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: true },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);

    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    const submitButton = screen.getByText('Отправка...');
    expect(submitButton).toBeDisabled();
  });

  it('calculates correct total with delivery', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);

    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));

    const courierRadio = screen.getByDisplayValue('courier');
    fireEvent.click(courierRadio);

    fireEvent.click(screen.getByText('Продолжить'));

    expect(screen.getByText('Итого к оплате')).toBeInTheDocument();
    expect(screen.getByText('1600 ₽')).toBeInTheDocument();
  });

  it('displays cart summary correctly', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        cart: { items: mockCartItems },
        order: { loading: false },
      };
      return selector(state);
    });

    render(<CheckoutModal onClose={mockOnClose} />);

    const phoneInput = screen.getByPlaceholderText('+7 (999) 123-45-67');
    fireEvent.change(phoneInput, { target: { value: '+79991234567' } });
    fireEvent.click(screen.getByText('Продолжить'));
    fireEvent.click(screen.getByText('Продолжить'));

    expect(screen.getByText('Товары (3 шт.)')).toBeInTheDocument();
    // Итого содержит ту же сумму - проверяем по контексту
    const totalElements = screen.getAllByText('1400 ₽');
    expect(totalElements.length).toBeGreaterThanOrEqual(1);
  });
});
