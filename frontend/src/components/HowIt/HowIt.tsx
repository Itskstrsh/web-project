import { motion } from 'framer-motion';
import React from 'react';



import bg5 from '../images/KruASSani.png';
import bg1 from '../images/Maga.png';
import bg2 from '../images/Pelmeni228.png';
import bg4 from '../images/ReadyToEat.png';
import bg3 from '../images/Vareniki.png';


const HowItWorks: React.FC = () => {
const stats = [
    {
      number: '2',
      label: 'Магазина',
      description: 'С продукцией в наличии',
      link: '#assortment',
      background: bg1
    },
    {
      number: '7',
      label: 'видов пельменей на любой вкус',
      description: 'От классики до авторских решений',
      link: '#pelmeni',
      background: bg2
    },
    {
      number: '11',
      label: 'Видов вареников',
      description: 'Разнообразное меню на каждый день',
      link: '#vareniki',
      background: bg3
    },
    {
      number: '53',
      label: 'вид выпечки, десертов и тортов',
      description: 'Свежая выпечка и сладости',
      link: '#bakery',
      background: bg4
    },
    {
      number: '21',
      label: 'Вид выпечки, десертов, тортов',
      description: 'Точно найдете сладость на ваш вкус',
      link: '#tort',
      background: bg5
    }
  ];

  const handleCardClick = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white relative overflow-hidden py-20 lg:py-28">
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-green-100 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-10 w-12 h-12 bg-emerald-100 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-yellow-100 rounded-full opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-900 mb-6">
            КАК ВСЁ УСТРОЕНО
          </h2>
          <p className="text-xl md:text-2xl text-green-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Пространство, где вкус сочетается с заботой и вдохновением
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-6 lg:p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(stat.link)}
            >
              {/* Фоновое изображение */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-3xl"
                style={{ backgroundImage: `url(${stat.background})` }}
              >
                {/* Темный оверлей для лучшей читаемости */}
                <div className="absolute inset-0 bg-black/40 rounded-3xl group-hover:bg-black/30 transition-all duration-300"></div>
                
                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-800/10 rounded-3xl"></div>
              </div>

              {/* Контент */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Число */}
                <div className="text-center mb-4">
                  <span className="text-5xl lg:text-6xl font-black text-white drop-shadow-lg">
                    {stat.number}
                  </span>
                </div>
                
                {/* Описание */}
                <div className="text-center">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                    {stat.label}
                  </h3>
                  <p className="text-green-100 font-medium text-sm lg:text-base drop-shadow">
                    {stat.description}
                  </p>
                </div>

                {/* Индикатор кликабельности */}
                <div className="flex justify-center mt-4">
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold">Подробнее</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Декоративный элемент */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительный декоративный элемент */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;