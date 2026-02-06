import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearCart, closeCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector(state => state.cart);
  const { loading: orderLoading } = useAppSelector(state => state.order);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    deliveryType: 'pickup' as 'pickup' | 'courier',
    address: '',
    comments: '',
    paymentMethod: 'cash' as 'cash' | 'card' | 'online',
  });

  const deliveryPrice = formData.deliveryType === 'courier' ? 200 : 0;
  const finalTotal = cartTotal + deliveryPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.phone) {
      alert('Пожалуйста, введите номер телефона');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      items: cartItems,
      customer: {
        phone: formData.phone,
        name: formData.name || undefined,
      },
      delivery: {
        type: formData.deliveryType,
        address: formData.deliveryType === 'courier' ? formData.address : undefined,
        price: deliveryPrice,
      },
      total: finalTotal,
      comments: formData.comments || undefined,
      paymentMethod: formData.paymentMethod,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();

      dispatch(clearCart());
      dispatch(closeCart());
      onClose();

    } catch (error) {
      console.error('Ошибка оформления заказа:', error);

      dispatch(clearCart());
      dispatch(closeCart());
      onClose();
    }
  };


  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-900">Оформление заказа</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-semibold
                  ${step >= num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`
                    flex-1 h-1 mx-2
                    ${step > num ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Имя (необязательно)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Как к вам обращаться?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 mt-6"
                >
                  Продолжить
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Способ получения</h3>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      checked={formData.deliveryType === 'pickup'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Самовывоз</div>
                      <div className="text-sm text-gray-600">г. Москва, ул. Примерная, д. 1</div>
                      <div className="text-sm text-gray-600">Ежедневно с 10:00 до 22:00</div>
                    </div>
                    <div className="font-semibold">Бесплатно</div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="courier"
                      checked={formData.deliveryType === 'courier'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Доставка курьером</div>
                      <div className="text-sm text-gray-600">В течение 60 минут</div>
                    </div>
                    <div className="font-semibold">200 ₽</div>
                  </label>
                </div>

                {formData.deliveryType === 'courier' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Адрес доставки *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Улица, дом, квартира"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required={formData.deliveryType === 'courier'}
                    />
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Оплата и подтверждение</h3>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Способ оплаты
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`
                      p-4 border rounded-lg cursor-pointer text-center
                      ${formData.paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="font-medium">Наличные</div>
                      <div className="text-sm text-gray-600">Курьеру или в точке</div>
                    </label>

                    <label className={`
                      p-4 border rounded-lg cursor-pointer text-center
                      ${formData.paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="font-medium">Картой</div>
                      <div className="text-sm text-gray-600">Курьеру или онлайн</div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Комментарий к заказу (необязательно)
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    placeholder="Пожелания, особенности доставки..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                      <span>{cartTotal} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>{deliveryPrice > 0 ? `${deliveryPrice} ₽` : 'Бесплатно'}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Итого к оплате</span>
                      <span>{finalTotal} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {orderLoading ? 'Отправка...' : 'Подтвердить заказ'}
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Нажимая "Подтвердить заказ", вы соглашаетесь с условиями обработки персональных данных
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;