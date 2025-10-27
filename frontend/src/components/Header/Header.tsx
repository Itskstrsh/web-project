import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenu } from '../../store/slices/menuSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(state => 
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );
  const isMenuOpen = useAppSelector(state => state.menu.isMenuOpen);

  const menuItems = [
    { label: 'Часто покупают', href: '#popular' },
    { label: '0 нас', href: '#about' },
    { label: 'Ассортимент', href: '#assortment' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Доставка', href: '#delivery' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {}
        <div className="flex items-center justify-between py-4">
          {}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-red-600">ВИНЕГРЕТ</div>
            <div className="text-sm text-gray-600 border-l border-gray-300 pl-4">
              МАГАЗИН – КУЛИНАРИЯ
            </div>
          </div>

          {/* Телефон */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-gray-600">Телефон:</span>
            <a href="tel:+79881304576" className="text-lg font-semibold text-gray-900 hover:text-red-600">
              +7 (988) 130-45-76
            </a>
          </div>

          {/* Корзина и меню */}
          <div className="flex items-center space-x-4">
            {/* Корзина */}
            <button className="relative p-2 text-gray-600 hover:text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Кнопка меню для мобильных */}
            <button 
              onClick={() => dispatch(toggleMenu())}
              className="md:hidden p-2 text-gray-600 hover:text-red-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Навигационное меню */}
        <nav className="hidden md:flex justify-center space-x-8 py-4 border-t border-gray-200">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Мобильное меню */}
      <div className={`md:hidden bg-white border-t ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block py-3 text-gray-700 hover:text-red-600 border-b border-gray-100"
            >
              {item.label}
            </a>
          ))}
          {/* Телефон в мобильном меню */}
          <div className="py-3 border-b border-gray-100">
            <a href="tel:+79881304576" className="text-gray-700 hover:text-red-600">
              +7 (988) 130-45-76
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;