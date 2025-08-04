import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { OrderItem } from '../App';
import { ShoppingCart, Gift, X } from 'lucide-react';

interface Props {
  order: OrderItem[];
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export const OrderSummary: React.FC<Props> = ({ order, setOrder }) => {
  const flags = useFlags();
  
  const removeFromOrder = (id: string) => {
    setOrder(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setOrder(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const loyaltyDiscount = flags.loyaltyProgram ? subtotal * 0.1 : 0;
  const total = subtotal - loyaltyDiscount;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, height: 0 },
    visible: { opacity: 1, x: 0, height: 'auto', transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { opacity: 0, x: 50, height: 0, transition: { duration: 0.3 } },
  };

  if (order.length === 0) {
    return (
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
        </div>
        <div className="text-center py-8">
          <motion.div 
            className="text-6xl mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          >
            🛒
          </motion.div>
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-2 mb-6">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
        <motion.span 
          key={order.reduce((sum, item) => sum + item.quantity, 0)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
          {order.reduce((sum, item) => sum + item.quantity, 0)} items
        </motion.span>
      </div>

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {order.map((item) => (
            <motion.div 
              key={item.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{item.image}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 border border-gray-200 rounded-full">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-l-full hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-r-full hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromOrder(item.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <AnimatePresence>
        {flags.loyaltyProgram && loyaltyDiscount > 0 && (
          <motion.div 
            className="flex justify-between text-green-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span>Loyalty Discount (10%)</span>
            </div>
            <span>-${loyaltyDiscount.toFixed(2)}</span>
          </motion.div>
        )}
        </AnimatePresence>
        
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
          <span>Total</span>
          <motion.span
            key={total}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            ${total.toFixed(2)}
          </motion.span>
        </div>
      </div>

      <motion.button 
        className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.2)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Place Order 🍽️
      </motion.button>

      <AnimatePresence>
        {flags.loyaltyProgram && (
          <motion.div 
            className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                You'll earn {Math.floor(total)} loyalty points with this order!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};