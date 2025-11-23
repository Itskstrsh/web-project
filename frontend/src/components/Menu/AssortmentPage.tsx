// components/Menu/AssortmentPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProducts, setCurrentCategory } from '../../store/slices/productSlice';
import { getCategoryKey } from '../../store/slices/adminSlice';

const AssortmentPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { items: products, loading } = useAppSelector((state) => state.products);
  // Отслеживаем изменения в админке для обновления товаров и категорий
  const { products: adminProducts, categories: adminCategories } = useAppSelector((state) => state.admin);
  const [activeFilter, setActiveFilter] = useState<string>(category || 'all');

  // Объединяем базовые категории с категориями из админки
  const categories = useMemo(() => {
    const baseCategories = [
      { id: 'all', name: 'Все продукты', categoryKey: 'all' },
      { id: 'pelmeni', name: 'Пельмени', categoryKey: 'pelmeni' },
      { id: 'vareniki', name: 'Вареники', categoryKey: 'vareniki' },
      { id: 'bakery', name: 'Выпечка', categoryKey: 'bakery' },
      { id: 'desserts', name: 'Десерты', categoryKey: 'desserts' },
      { id: 'polupoker', name: 'Полуфабрикаты', categoryKey: 'polupoker' }
    ];

    // Добавляем категории из админки, которых нет в базовых
    const baseCategoryKeys = new Set(baseCategories.map(c => c.categoryKey));
    const adminCategoriesList = adminCategories
      .filter(cat => {
        const key = getCategoryKey(cat);
        return !baseCategoryKeys.has(key);
      })
      .map(cat => ({
        id: getCategoryKey(cat),
        name: cat.name,
        categoryKey: getCategoryKey(cat)
      }));

    return [...baseCategories, ...adminCategoriesList];
  }, [adminCategories]);

  useEffect(() => {
    // Если есть категория в URL, устанавливаем фильтр
    if (category) {
      setActiveFilter(category);
      dispatch(setCurrentCategory(category));
    }
    
    // Загружаем продукты (включая товары из админки)
    dispatch(fetchProducts());
  }, [category, dispatch]);

  // Обновляем товары при изменении в админке
  useEffect(() => {
    dispatch(fetchProducts());
  }, [adminProducts.length, adminCategories.length, dispatch]);

  // Фильтруем продукты по активной категории
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const handleFilterClick = (categoryId: string) => {
    setActiveFilter(categoryId);
    // Обновляем URL без перезагрузки страницы
    if (categoryId === 'all') {
      navigate('/assortment');
    } else {
      navigate(`/assortment/${categoryId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-green-700">Загрузка продуктов...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-900 mb-4">
            {activeFilter === 'all' ? 'Весь ассортимент' : categories.find(c => c.id === activeFilter)?.name}
          </h1>
          <p className="text-xl text-green-700">
            Выберите категорию или просмотрите все продукты
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                activeFilter === cat.id
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Сетка продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
              <p className="text-green-700 mb-4 text-sm">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-green-600">{product.price}₽</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Если нет продуктов */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-700 text-lg">В этой категории пока нет продуктов</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssortmentPage;
