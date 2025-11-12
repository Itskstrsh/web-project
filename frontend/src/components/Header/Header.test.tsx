import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import menuReducer from '../../store/slices/menuSlice';
import Header from './Header';


// Определяем типы для состояния
interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface RootState {
  cart: CartState;
  menu: { isMenuOpen: boolean };
}

// Создаем мок store с правильными типами
const createMockStore = (preloadedState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      cart: (state: CartState = { items: [] }) => state,
      menu: menuReducer,
    },
    preloadedState: {
      cart: { items: [] },
      menu: { isMenuOpen: false },
      ...preloadedState,
    } as RootState,
  });
};

describe('Header Component', () => {
  // Базовые тесты
  test('renders header text and subtitle', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    expect(screen.getByText('ВИНЕГРЕТ')).toBeInTheDocument();
    expect(screen.getByText('МАГАЗИН – КУЛИНАРИЯ')).toBeInTheDocument();
  });



  test('renders cart count when cart has items', () => {
    const store = createMockStore({
      cart: { 
        items: [
          { id: 1, name: 'Product 1', quantity: 2 },
          { id: 2, name: 'Product 2', quantity: 1 }
        ] 
      }
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('renders cart count with single item', () => {
    const store = createMockStore({
      cart: { 
        items: [{ id: 1, name: 'Product', quantity: 1 }] 
      }
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // ВЕТВЛЕНИЯ МОБИЛЬНОГО МЕНЮ
  test('mobile menu is HIDDEN when isMenuOpen is false', () => {
    const store = createMockStore({
      menu: { isMenuOpen: false }
    });

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Проверяем что мобильное меню скрыто через класс hidden
    const mobileMenu = container.querySelector('.md\\:hidden.bg-white');
    expect(mobileMenu).toHaveClass('hidden');
  });

  test('mobile menu is VISIBLE when isMenuOpen is true', () => {
    const store = createMockStore({
      menu: { isMenuOpen: true }
    });

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Проверяем что мобильное меню видно (нет класса hidden)
    const mobileMenu = container.querySelector('.md\\:hidden.bg-white');
    expect(mobileMenu).not.toHaveClass('hidden');
    
    // Проверяем что телефон отображается дважды
    const phoneLinks = screen.getAllByText('+7 (988) 130-45-76');
    expect(phoneLinks).toHaveLength(2);
  });

  // ТЕСТ ДЛЯ DISPATCH
  test('dispatches toggleMenu action when mobile menu button is clicked', () => {
    const store = createMockStore();
    
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Находим кнопку меню по классу md:hidden
    const mobileMenuButton = container.querySelector('button.md\\:hidden');
    expect(mobileMenuButton).toBeInTheDocument();
    
    fireEvent.click(mobileMenuButton!);
    
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'menu/toggleMenu'
    });
    
    dispatchSpy.mockRestore();
  });

  // ИСПРАВЛЕННЫЙ ТЕСТ ДЛЯ НАВИГАЦИОННЫХ ССЫЛОК
  test('desktop navigation links have correct hrefs', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Находим десктопную навигацию по классу
    const desktopNav = container.querySelector('nav.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
    
    // Проверяем ссылки внутри десктопной навигации
    if (desktopNav) {
      const popularLink = desktopNav.querySelector('a[href="#popular"]');
      expect(popularLink).toBeInTheDocument();
      expect(popularLink).toHaveTextContent('Часто покупают');
      
      const assortmentLink = desktopNav.querySelector('a[href="#assortment"]');
      expect(assortmentLink).toBeInTheDocument();
      expect(assortmentLink).toHaveTextContent('Ассортимент');
    }
  });

  test('phone number link has correct href', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Берем первую ссылку на телефон (десктопную)
    const phoneLinks = screen.getAllByText('+7 (988) 130-45-76');
    expect(phoneLinks[0]).toHaveAttribute('href', 'tel:+79881304576');
  });


  test('handles very large cart quantity', () => {
    const store = createMockStore({
      cart: { 
        items: [{ id: 1, name: 'Product', quantity: 999 }] 
      }
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  // ИСПРАВЛЕННЫЙ ТЕСТ ДЛЯ ПУНКТОВ МЕНЮ
  test('renders all menu items', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    const menuItems = [
      'Часто покупают', '0 нас', 'Ассортимент', 
      'Отзывы', 'Доставка', 'Контакты'
    ];
    
    menuItems.forEach(item => {
      // Проверяем что каждый пункт меню есть хотя бы в одной навигации
      const elements = screen.getAllByText(item);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  // ТЕСТ ДЛЯ СТРУКТУРЫ КОМПОНЕНТА
  test('renders all main sections', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Телефон:')).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  // ТЕСТ ДЛЯ МОБИЛЬНОГО МЕНЮ ССЫЛОК
  test('mobile menu links have correct hrefs when menu is open', () => {
    const store = createMockStore({
      menu: { isMenuOpen: true }
    });

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Находим мобильное меню
    const mobileMenu = container.querySelector('.md\\:hidden.bg-white');
    expect(mobileMenu).toBeInTheDocument();
    
    if (mobileMenu) {
      // Проверяем ссылки в мобильном меню
      const popularLink = mobileMenu.querySelector('a[href="#popular"]');
      expect(popularLink).toBeInTheDocument();
      
      const contactsLink = mobileMenu.querySelector('a[href="#contacts"]');
      expect(contactsLink).toBeInTheDocument();
    }
  });
});

// Дополнительные тесты для полного покрытия
describe('Header Additional Tests', () => {
  test('cart icon is rendered', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Проверяем что есть кнопка корзины
    const cartButton = container.querySelector('button.relative');
    expect(cartButton).toBeInTheDocument();
  });

  test('desktop phone section is hidden on mobile', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    
    // Проверяем что телефон в десктопной версии скрыт на mobile
    const desktopPhone = container.querySelector('.hidden.md\\:flex');
    expect(desktopPhone).toBeInTheDocument();
  });
});
