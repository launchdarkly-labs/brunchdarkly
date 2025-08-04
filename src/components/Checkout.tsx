import React from 'react';
import { motion } from 'framer-motion';
import { OrderItem } from '../App';

interface Props {
  order: OrderItem[];
  onCheckout: () => void;
}

export const Checkout: React.FC<Props> = ({ order, onCheckout }) => {
  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Total:</span>
        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
      <motion.button
        onClick={onCheckout}
        disabled={order.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Place Order 🍽️
      </motion.button>
    </div>
  );
};