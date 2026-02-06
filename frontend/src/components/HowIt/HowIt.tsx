import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [bg1, bg2, bg3, bg4, bg5] = await Promise.all([
          import('../../../public/images/Maga.png'),
          import('../../../public/images/Pelmeni228.png'),
          import('../../../public/images/Vareniki.png'),
          import('../../../public/images/ReadyToEat.png'),
          import('../../../public/images/KruASSani.png')
        ]);

        setImages({
          shop: bg1.default,
          pelmeni: bg2.default,
          vareniki: bg3.default,
          rte: bg4.default,
          desserts: bg5.default
        });
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const stats = [
    {
      number: '2',
      line1: 'Магазина',
      line2: 'С продукцией в наличии',
      path: '/assortment',
      imageKey: 'shop'
    },
    {
      number: '7',
      line1: 'видов пельменей',
      line2: 'на любой вкус',
      path: '/assortment/pelmeni',
      imageKey: 'pelmeni'
    },
    {
      number: '11',
      line1: 'видов вареников',
      line2: 'на любой вкус',
      path: '/vareniki',
      imageKey: 'vareniki'
    },
    {
      number: '53',
      line1: 'вида готовой еды',
      line2: 'каждый найдет свою',
      path: '/polupoker',
      imageKey: 'rte'
    },
    {
      number: '21',
      line1: 'Вид выпечки',
      line2: 'десертов, тортов',
      path: '/desserts',
      imageKey: 'desserts'
    }
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <section className="bg-white relative overflow-hidden py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-green-700">Загрузка...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>

      <div className="absolute top-20 right-10 w-16 h-16 bg-green-100 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-10 w-12 h-12 bg-emerald-100 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-yellow-100 rounded-full opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden min-h-[180px] flex flex-col justify-end"
              onClick={() => handleCardClick(stat.path)}
            >
              {(stat.imageKey && images[stat.imageKey]) ? (
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src={images[stat.imageKey]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-3xl"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-3xl transition-all duration-300"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl">
                  <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
                </div>
              )}

              <div className="relative z-10 text-center">
                <div className="mb-1">
                  <span className="text-3xl lg:text-4xl font-black text-white drop-shadow-2xl">
                    {stat.number}
                  </span>
                </div>

                <div className="space-y-0">
                  <div className="text-sm lg:text-base font-bold text-white drop-shadow-2xl leading-tight">
                    {stat.line1}
                  </div>
                  {stat.line2 && (
                    <div className="text-sm lg:text-base font-bold text-white drop-shadow-2xl leading-tight">
                      {stat.line2}
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-2">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold">Подробнее</span>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
            </motion.div>
          ))}
        </div>

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