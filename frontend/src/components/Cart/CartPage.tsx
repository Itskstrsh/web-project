// components/Cart/CartPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeCart, toggleCart } from '../../store/slices/cartSlice';
import Cart from './Cart';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.cart);

  useEffect(() => {
    // Открываем корзину при монтировании страницы, если она закрыта
    if (!isOpen) {
      dispatch(toggleCart());
    }
    
    // Закрываем корзину при размонтировании
    return () => {
      dispatch(closeCart());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился только при монтировании

  // Рендерим компонент корзины
  return <Cart />;
};

export default CartPage;
