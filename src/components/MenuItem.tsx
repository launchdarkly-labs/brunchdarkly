import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { OrderItem } from '../App';
import { Plus, Star, CheckCircle } from 'lucide-react';

interface Props {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    dietary: string[];
    image: string;
    category: string;
  };
  onAddToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
}

export const MenuItem: React.FC<Props> = ({ item, onAddToOrder }) => {
  const flags = useFlags();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToOrder = () => {
    if (isAdding) return;

    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
    
    onAddToOrder({
      id: item.id,
      name: item.name,
      price: item.price,
      dietary: item.dietary,
    });
  };

  const getDietaryBadgeColor = (dietary: string) => {
    switch (dietary) {
      case 'vegan': return 'bg-green-100 text-green-800';
      case 'vegetarian': return 'bg-emerald-100 text-emerald-800';
      case 'gluten-free': return 'bg-sky-100 text-sky-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const discountedPrice = flags.limitedTimeOffers && item.id.includes('pancakes')
    ? item.price * 0.8 
    : item.price;

  const isDiscounted = discountedPrice < item.price;

  return (
    <motion.div 
      className="bg-white border border-gray-100 rounded-xl p-6 transition-shadow flex flex-col h-full"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="text-4xl"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.4 }}
            >
              {item.image}
            </motion.div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
              {item.category === 'premium' && (
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-xs font-medium text-amber-600">Premium</span>
                </div>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {flags.loyaltyProgram && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} 
                className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                +{Math.floor(item.price)} pts
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.dietary.map((diet) => (
            <span
              key={diet}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getDietaryBadgeColor(diet)}`}
            >
              {diet}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          {isDiscounted && (
            <span className="text-gray-400 line-through text-sm">${item.price.toFixed(2)}</span>
          )}
          <span className={`font-bold text-lg ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
            ${discountedPrice.toFixed(2)}
          </span>
          <AnimatePresence>
          {isDiscounted && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              20% OFF
            </motion.span>
          )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleAddToOrder}
          disabled={isAdding}
          className={`flex items-center justify-center w-28 h-10 rounded-lg font-medium transition-colors duration-300 overflow-hidden ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Added!</span>
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};