import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder } from '../../store/slices/orderSlice';
import type { RootState } from '../../store/store';

const OrderSuccessModal = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order.currentOrder);

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
        Заказ оформлен
        </h2>

        <p className="mb-2">
          Номер заказа:
          <br />
          <b className="text-lg">#{order.number}</b>
        </p>

        <p className="mb-2">
          Сумма: <b>{order.total} ₽</b>
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Мы свяжемся с вами по номеру<br />
          <b>{order.customer.phone}</b>
        </p>

        <button
          onClick={() => dispatch(setCurrentOrder(null))}
          className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
        >
          Понятно
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
