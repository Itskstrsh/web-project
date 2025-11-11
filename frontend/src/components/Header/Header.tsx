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
  ];

  return (
    <header className="bg-[#7AC65C]/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 rounded-b-3xl">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Логотип */}
        <div className="flex flex-col leading-tight">
          <div className="text-3xl font-extrabold tracking-wide">ВИНЕГРЕТ</div>
          <div className="text-sm text-white/80">МАГАЗИН – КУЛИНАРИЯ</div>
        </div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-3">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Телефон + бургер */}
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          {/* Телефон */}
          <a
            href="tel:+79881304576"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-full px-4 py-2 transition-all whitespace-nowrap"
          >
            {/* Иконка */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 flex-shrink-0"
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
            {/* Номер телефона (скрывается, если не помещается) */}
            <span className="hidden sm:inline font-semibold">+7 (988) 130-45-76</span>
          </a>

          {/* Кнопка меню для мобильных */}
          <button
            onClick={() => dispatch(toggleMenu())}
            className="md:hidden p-2 bg-white/15 hover:bg-white/25 rounded-full transition-all"
          >
            <svg
              className="w-6 h-6"
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
        className={`md:hidden bg-[#7AC65C]/95 border-t border-green-400 transition-all duration-300 rounded-b-3xl ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block py-3 text-white hover:bg-white/20 rounded-xl px-3 transition-colors"
            >
              {item.label}
            </a>
          ))}

          {/* Телефон в мобильном меню */}
          <div className="py-3">
            <a
              href="tel:+79881304576"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
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
              <span className="font-semibold">+7 (988) 130-45-76</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
