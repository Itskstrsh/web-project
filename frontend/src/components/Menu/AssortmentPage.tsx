import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCategoryKey } from '../../store/slices/adminSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchProducts, setCurrentCategory } from '../../store/slices/productSlice';
import type { Product } from '../../types/product';
import Cart from '../Cart/Cart';
import CartIcon from '../Cart/CartIcon';

const getFullImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '/images/placeholder.jpg';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  if (imagePath.startsWith('/uploads/')) {
    return `http://188.225.39.129${imagePath}`;
  }

  if (imagePath.startsWith('/')) {
    return `http://188.225.39.129${imagePath}`;
  }

  return imagePath;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector(state => state.cart);

  const inCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      weight: product.weight ? parseInt(product.weight, 10) : undefined,
      imageUrl: product.image,
    }));
  };

  const imagePath = product.image || product.imageUrl;

  const fullImageSrc = getFullImageUrl(imagePath);

  console.log(`Product: ${product.name}, Image path: ${imagePath}, Full URL: ${fullImageSrc}`);

  return (
    <article className="group bg-white rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-shadow">

      <div className="w-full h-48 mb-4 overflow-hidden rounded-2xl bg-green-50">
        <img
          src={fullImageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.error(`Ошибка загрузки изображения для продукта "${product.name}": ${fullImageSrc}`);
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
      </div>

      <h3 className="text-xl font-bold text-green-900 mb-2">
        {product.name}
      </h3>

      <p className="text-green-700 mb-4 text-sm line-clamp-3">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-lg font-bold text-green-900">
            {product.price || 0} ₽
          </div>
          {product.weight && (
            <div className="text-sm text-green-600">
              {product.weight} г
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors ${inCart
              ? 'bg-green-100 text-green-800'
              : 'bg-green-500 text-white hover:bg-green-600'
            }`}
        >
          {inCart ? '✓ В корзине' : 'В корзину'}
        </button>
      </div>
    </article>
  );
};

const CategoryButton: React.FC<{
  category: { id: string; name: string; categoryKey: string };
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-2xl font-semibold transition-all ${isActive
        ? 'bg-green-500 text-white shadow-lg'
        : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
  >
    {category.name}
  </button>
);

const AssortmentPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: products, loading } = useAppSelector(state => state.products);
  const { categories: adminCategories } = useAppSelector(state => state.admin);

  const activeCategoryFromUrl = useMemo(() => {
    if (location.pathname === '/assortment') return 'all';
    return category || 'all';
  }, [category, location.pathname]);

  const [activeFilter, setActiveFilter] = useState(activeCategoryFromUrl);

  const categories = useMemo(() => {
    const base = [
      { id: 'all', name: 'Все продукты', categoryKey: 'all' },
      { id: 'pelmeni', name: 'Пельмени', categoryKey: 'pelmeni' },
      { id: 'vareniki', name: 'Вареники', categoryKey: 'vareniki' },
      { id: 'bakery', name: 'Выпечка', categoryKey: 'bakery' },
      { id: 'desserts', name: 'Десерты', categoryKey: 'desserts' },
      { id: 'polupoker', name: 'Полуфабрикаты', categoryKey: 'polupoker' },
    ];

    const baseKeys = new Set(base.map(c => c.categoryKey));

    const admin = adminCategories
      .filter(cat => !baseKeys.has(getCategoryKey(cat)))
      .map(cat => ({
        id: getCategoryKey(cat),
        name: cat.name,
        categoryKey: getCategoryKey(cat),
      }));

    return [...base, ...admin];
  }, [adminCategories]);

  const filteredProducts = useMemo(() => {
    return activeFilter === 'all'
      ? products
      : products.filter(p => p.category === activeFilter);
  }, [products, activeFilter]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setActiveFilter(activeCategoryFromUrl);
    dispatch(setCurrentCategory(activeCategoryFromUrl));
  }, [activeCategoryFromUrl, dispatch]);

  const handleFilterClick = (id: string) => {
    navigate(id === 'all' ? '/assortment' : `/assortment/${id}`, { replace: true });
  };

  const activeCategoryName = useMemo(() => {
    if (activeFilter === 'all') return 'Весь ассортимент';
    return categories.find(c => c.id === activeFilter)?.name;
  }, [activeFilter, categories]);

  useEffect(() => {
    if (products.length > 0) {
      console.log('Продукты в AssortmentPage:', products.map(p => ({
        name: p.name,
        image: p.image,
        imageUrl: p.imageUrl,
        category: p.category,
      })));
    }
  }, [products]);

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-green-700">Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-black text-green-900 text-center mb-8">
            {activeCategoryName}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <CategoryButton
                key={cat.id}
                category={cat}
                isActive={activeFilter === cat.id}
                onClick={() => handleFilterClick(cat.id)}
              />
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-green-700 text-lg">
              В этой категории пока нет продуктов
            </p>
          )}
        </div>
      </div>

      <CartIcon />
      <Cart />
    </>
  );
};

export default AssortmentPage;
