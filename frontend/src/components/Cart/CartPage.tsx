import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeCart, toggleCart } from '../../store/slices/cartSlice';
import Cart from './Cart';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.cart);

  useEffect(() => {
    if (!isOpen) {
      dispatch(toggleCart());
    }
    return () => {
      dispatch(closeCart());
    };
  }, [dispatch, isOpen]);

  return <Cart />;
};

export default CartPage;
