import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Заголовок баннера */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              ВКУС МЕНЯЕТ НАСТРОЕНИЕ!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              ДОМАШНЯЯ ЕДА БЕЗ ИЗЖОГИ И ТЯЖЕСТИ В ЖЕЛУДКЕ В ШАГЕ ОТ ДОМА
            </p>
          </div>

          {/* Кнопка призыва к действию */}
          <div className="mb-12">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg">
              Посмотреть ассортимент
            </button>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">БЕЗ ГМО И КОНСЕРВАНТОВ</h3>
                <p className="text-gray-600 text-sm">
                  Уже 7 лет готовим для вас на натуральных продуктов высокого качества.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ДЛЯ САМЫХ МАЛЕНЬКИХ</h3>
                <p className="text-gray-600 text-sm">
                  Наша еда подходит даже для детей от 1 года.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ДЛЯ ТЕХ КТО СЧИТАЕТ БЖУ</h3>
                <p className="text-gray-600 text-sm">
                  Мы специально посчитали БЖУ, чтобы вы вписались в свою норму.
                </p>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Современное и безопасное производство</h2>
            <p className="text-gray-600">
              Мы используем только современное оборудование и соблюдаем все стандарты безопасности пищевого производства.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;