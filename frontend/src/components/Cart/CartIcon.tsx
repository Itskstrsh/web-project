import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCart } from '../../store/slices/cartSlice';

const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-40"
      aria-label="Корзина"
    >
      <div className="relative">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>

        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </div>
    </button>
  );
};

export default CartIcon;