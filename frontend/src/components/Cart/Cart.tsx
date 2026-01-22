import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearCart, closeCart, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import CheckoutModal from '../Checkout/CheckoutModal';

const CartItem: React.FC<{ item: any }> = React.memo(({ item }) => {
  const dispatch = useAppDispatch();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b border-green-100 last:border-b-0">
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg mr-4"
        />
      )}
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-green-900 truncate">{item.name}</h4>
        <p className="text-green-600 text-sm">{item.price} ₽</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-green-50 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-3 py-1 text-green-700 hover:bg-green-100 rounded-l-lg"
            aria-label="Уменьшить количество"
          >
            –
          </button>
          <span className="px-3 py-1 font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-3 py-1 text-green-700 hover:bg-green-100 rounded-r-lg"
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
        
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-red-500 hover:text-red-700 p-2"
          aria-label="Удалить"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.cart);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    if (isOpen && !showCheckout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, showCheckout]);
  
  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };
  
  const handleCheckoutClose = () => {
    setShowCheckout(false);
    if (isOpen) {
      dispatch(closeCart());
    }
  };
  
  const handleCartClose = () => {
    setShowCheckout(false);
    dispatch(closeCart());
  };
  
  if (!isOpen && !showCheckout) return null;
  
  return (
    <>
      {isOpen && !showCheckout && (
        <div 
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={handleCartClose}
          aria-hidden="true"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            pointerEvents: 'auto',
          }}
        />
      )}
      
      {showCheckout && <CheckoutModal onClose={handleCheckoutClose} />}
      
      {isOpen && !showCheckout && (
        <div 
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-green-900">Корзина</h2>
                <button
                  onClick={handleCartClose}
                  className="text-green-600 hover:text-green-800 p-2 transition-colors"
                  aria-label="Закрыть"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-green-600 mt-1">
                {itemCount} товар{itemCount === 1 ? '' : itemCount > 1 && itemCount < 5 ? 'а' : 'ов'}
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-green-300 mb-4">🛒</div>
                  <p className="text-green-700 text-lg font-medium">Корзина пуста</p>
                  <p className="text-green-600">Добавьте товары из ассортимента</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-green-100 bg-green-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-green-900">Итого:</span>
                <span className="text-2xl font-bold text-green-900">{total} ₽</span>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCheckoutClick}
                  disabled={items.length === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    items.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Оформить заказ
                </button>
                
                {items.length > 0 && (
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="w-full py-3 rounded-lg font-semibold border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Очистить корзину
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;