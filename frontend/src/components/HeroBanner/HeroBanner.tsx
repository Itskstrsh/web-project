import { motion } from 'framer-motion';
import React from 'react';
import cat from '../images/cat.png';

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-white relative overflow-hidden min-h-screen flex items-center w-full">
      {/* Декоративный фон с градиентами */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50"></div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-100 rounded-full opacity-60"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-emerald-100 rounded-full opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-yellow-100 rounded-full opacity-50"></div>

      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Левая часть - текст */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 text-left w-full px-4 lg:px-0"
        >
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-green-900 mb-6 leading-tight">
              ВКУС МЕНЯЕТ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                НАСТРОЕНИЕ
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-green-700 font-medium max-w-2xl">
              Откройте для себя мир изысканных вкусов и кулинарных шедевров
            </p>
          </div>

          {/* Кнопка */}
          <div className="mb-10">
            <a
              href="#order"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-5 px-12 rounded-2xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>АССОРТИМЕНТ</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Список преимуществ */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-green-100">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base">✓</span>
              </div>
              <span className="text-green-900 font-bold text-lg">ПОЛУФАБРИКАТЫ</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-green-100">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base">✓</span>
              </div>
              <span className="text-green-900 font-bold text-lg">ВЫПЕЧКА</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-green-100">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base">✓</span>
              </div>
              <span className="text-green-900 font-bold text-lg">ГОТОВАЯ ЕДА</span>
            </div>
          </div>
        </motion.div>

        {/* Правая часть - кот */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:w-1/2 flex justify-end items-center mt-10 lg:mt-0 w-full"
        >
          <div className="relative">
            {/* Декоративная рамка */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl transform rotate-3 scale-105"></div>
            
            {/* Основное изображение */}
            <img
              src={cat}
              alt="Котик с едой"
              className="relative z-10 h-[500px] md:h-[600px] lg:h-[700px] w-auto object-contain rounded-2xl"
            />
            
            {/* Декоративные элементы */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-2xl opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-300 rounded-2xl opacity-30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;