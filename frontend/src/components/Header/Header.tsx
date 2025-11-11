import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenu } from '../../store/slices/menuSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(state => state.menu.isMenuOpen);

  const menuItems = [
    { label: 'О нас', href: '#about' },
    { label: 'Ассортимент', href: '#assortment' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Доставка', href: '#delivery' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Логотип с акцентом */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl font-black text-green-900 tracking-tight">ВИНЕГРЕТ</div>
            <div className="text-xs text-green-600 font-medium">МАГАЗИН – КУЛИНАРИЯ</div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative px-5 py-3 text-green-900 font-semibold transition-all hover:text-emerald-600 group"
            >
              {item.label}
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-3/5"></span>
            </a>
          ))}
        </nav>

        {/* Телефон + бургер */}
        <div className="flex items-center gap-3">
          {/* Телефон */}
          <a
            href="tel:+79881304576"
            className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-5 py-3 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8.5C2 4.91 4.91 2 8.5 2h.79c.7 0 1.32.39 1.65 1.01l1.15 2.16a2 2 0 01-.45 2.42l-.91.8a12.042 12.042 0 005.36 5.36l.8-.91a2 2 0 012.42-.45l2.16 1.15c.62.33 1.01.95 1.01 1.65v.79c0 3.59-2.91 6.5-6.5 6.5C8.47 23 2 16.53 2 8.5z"
              />
            </svg>
            <span className="font-bold text-sm">+7 (988) 130-45-76</span>
          </a>

          {/* Кнопка меню для мобильных */}
          <button
            onClick={() => dispatch(toggleMenu())}
            className="md:hidden p-3 bg-green-50 hover:bg-green-100 rounded-2xl transition-all border border-green-200"
          >
            <svg
              className="w-5 h-5 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`md:hidden bg-white/98 backdrop-blur-lg border-t border-green-100 transition-all duration-300 shadow-xl ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block py-4 text-green-900 hover:text-emerald-600 hover:bg-green-50 rounded-xl px-4 transition-all font-semibold border-b border-green-50 last:border-b-0"
            >
              {item.label}
            </a>
          ))}

          {/* Телефон в мобильном меню */}
          <div className="pt-4">
            <a
              href="tel:+79881304576"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 8.5C2 4.91 4.91 2 8.5 2h.79c.7 0 1.32.39 1.65 1.01l1.15 2.16a2 2 0 01-.45 2.42l-.91.8a12.042 12.042 0 005.36 5.36l.8-.91a2 2 0 012.42-.45l2.16 1.15c.62.33 1.01.95 1.01 1.65v.79c0 3.59-2.91 6.5-6.5 6.5C8.47 23 2 16.53 2 8.5z"
                />
              </svg>
              <span className="font-bold">+7 (988) 130-45-76</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;