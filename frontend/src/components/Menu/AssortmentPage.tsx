// components/Menu/AssortmentPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCategoryKey } from '../../store/slices/adminSlice';
import { fetchProducts, setCurrentCategory } from '../../store/slices/productSlice';

const AssortmentPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: products, loading } = useAppSelector(state => state.products);
  const { products: adminProducts, categories: adminCategories } =
    useAppSelector(state => state.admin);

  // ✅ ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ
  const activeCategoryFromUrl = useMemo(() => {
    // /assortment → all
    if (location.pathname === '/assortment') return 'all';

    // /assortment/:category
    if (category) return category;

    // /pelmeni
    const path = location.pathname.replace('/', '');
    return path || 'all';
  }, [category, location.pathname]);

  const [activeFilter, setActiveFilter] = useState(activeCategoryFromUrl);

  // категории
  const categories = useMemo(() => {
    const baseCategories = [
      { id: 'all', name: 'Все продукты', categoryKey: 'all' },
      { id: 'pelmeni', name: 'Пельмени', categoryKey: 'pelmeni' },
      { id: 'vareniki', name: 'Вареники', categoryKey: 'vareniki' },
      { id: 'bakery', name: 'Выпечка', categoryKey: 'bakery' },
      { id: 'desserts', name: 'Десерты', categoryKey: 'desserts' },
      { id: 'polupoker', name: 'Полуфабрикаты', categoryKey: 'polupoker' },
    ];

    const baseKeys = new Set(baseCategories.map(c => c.categoryKey));

    const adminList = adminCategories
      .filter(cat => !baseKeys.has(getCategoryKey(cat)))
      .map(cat => ({
        id: getCategoryKey(cat),
        name: cat.name,
        categoryKey: getCategoryKey(cat),
      }));

    return [...baseCategories, ...adminList];
  }, [adminCategories]);

  // загрузка продуктов — ОДИН РАЗ
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // обновление при изменениях из админки
  useEffect(() => {
    dispatch(fetchProducts());
  }, [adminProducts.length, adminCategories.length, dispatch]);

  // синхронизация фильтра с URL
  useEffect(() => {
    setActiveFilter(activeCategoryFromUrl);
    dispatch(setCurrentCategory(activeCategoryFromUrl));
  }, [activeCategoryFromUrl, dispatch]);

  // фильтрация
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter(p => p.category === activeFilter);
  }, [products, activeFilter]);

  const handleFilterClick = (categoryId: string) => {
    if (categoryId === 'all') {
      navigate('/assortment', { replace: true });
    } else {
      navigate(`/assortment/${categoryId}`, { replace: true });
    }
  };

  // spinner — ТОЛЬКО при первом заходе
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-green-700">Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-900 mb-4">
            {activeFilter === 'all'
              ? 'Весь ассортимент'
              : categories.find(c => c.id === activeFilter)?.name}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
            >
              <h3 className="text-xl font-bold text-green-900 mb-2">
                {product.name}
              </h3>
              <p className="text-green-700 mb-4 text-sm">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-700 text-lg">
              В этой категории пока нет продуктов
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssortmentPage;
