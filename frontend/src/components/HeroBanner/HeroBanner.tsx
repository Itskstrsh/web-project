import { motion } from 'framer-motion';
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#8CD97B] via-[#A3E87B] to-[#F5FCE8] text-gray-800 py-32 relative overflow-hidden">
      {/* Декоративная текстура */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')] mix-blend-soft-light pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        {/* Левый блок: Лозунг + кнопка */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 mb-6 drop-shadow-sm">
            ВКУС МЕНЯЕТ НАСТРОЕНИЕ!
          </h1>
          <a
            href="#assortment"
            className="inline-block bg-white/90 hover:bg-white text-green-800 font-semibold py-4 px-10 rounded-2xl text-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            Посмотреть ассортимент
          </a>
        </motion.div>

        {/* Правый блок можно оставить пустым для картинки или декоративного фона */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          {/* Здесь можно вставить иллюстрацию еды, если будет */}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
