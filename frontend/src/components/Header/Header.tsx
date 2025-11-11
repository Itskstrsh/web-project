// components/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { label: 'О нас', href: '/#about' },
    { label: 'Ассортимент', href: '/assortment' },
    { label: 'Отзывы', href: '/#reviews' },
    { label: 'Доставка', href: '/#delivery' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">V</span>
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl font-black text-green-900 tracking-tight">ВИНЕГРЕТ</div>
            <div className="text-xs text-green-600 font-medium">МАГАЗИН – КУЛИНАРИЯ</div>
          </div>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`relative px-5 py-3 font-semibold transition-all group ${
                location.pathname === item.href 
                  ? 'text-emerald-600' 
                  : 'text-green-900 hover:text-emerald-600'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-emerald-500 transition-all ${
                location.pathname === item.href ? 'w-3/5' : 'w-0 group-hover:w-3/5'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Телефон */}
        <a
          href="tel:+79881304576"
          className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-5 py-3 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          {/* ... иконка телефона ... */}
          <span className="font-bold text-sm">+7 (988) 130-45-76</span>
        </a>
      </div>
    </header>
  );
};

export default Header;