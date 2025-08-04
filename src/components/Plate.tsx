import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderItem } from '../App';

interface Props {
  order: OrderItem[];
}

export const Plate: React.FC<Props> = ({ order }) => {
  return (
    <div className="relative w-64 h-64 rounded-full bg-white shadow-lg mx-auto">
      <AnimatePresence>
        {order.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute',
              top: `${40 + Math.sin(index / order.length * 2 * Math.PI) * 20}%`,
              left: `${40 + Math.cos(index / order.length * 2 * Math.PI) * 20}%`,
            }}
          >
            <span className="text-4xl">{item.image}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};