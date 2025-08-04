import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { OrderItem } from '../App';
import { MenuItem } from './MenuItem';

interface Props {
  onAddToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
}

export const BrunchMenu: React.FC<Props> = ({ onAddToOrder }) => {
  const flags = useFlags();
  
  const baseItems = [
    { id: 'pancakes', name: 'Classic Pancakes', description: 'Fluffy buttermilk pancakes with maple syrup', price: 12.99, dietary: ['vegetarian'], image: '🥞', category: 'mains' },
    { id: 'avocado-toast', name: 'Avocado Toast', description: 'Smashed avocado on artisan sourdough', price: 14.99, dietary: ['vegan', 'vegetarian'], image: '🥑', category: 'mains' },
    { id: 'eggs-benedict', name: 'Eggs Benedict', description: 'Poached eggs with hollandaise on English muffins', price: 16.99, dietary: ['omnivore'], image: '🍳', category: 'mains' },
    { id: 'french-toast', name: 'French Toast', description: 'Brioche French toast with berry compote', price: 13.99, dietary: ['vegetarian'], image: '🍞', category: 'mains' },
  ];

  const premiumItems = [
    { id: 'truffle-scramble', name: 'Truffle Scrambled Eggs', description: 'Organic eggs with black truffle shavings', price: 28.99, dietary: ['vegetarian'], image: '🍄', category: 'premium' },
    { id: 'lobster-benedict', name: 'Lobster Benedict', description: 'Fresh lobster with hollandaise on brioche', price: 34.99, dietary: ['omnivore'], image: '🦞', category: 'premium' },
  ];

  const veganItems = [
    { id: 'vegan-pancakes', name: 'Vegan Pancakes', description: 'Plant-based pancakes with coconut whipped cream', price: 13.99, dietary: ['vegan', 'vegetarian'], image: '🥞', category: 'mains' },
    { id: 'tofu-scramble', name: 'Tofu Scramble', description: 'Seasoned tofu with vegetables and nutritional yeast', price: 12.99, dietary: ['vegan', 'vegetarian'], image: '🌿', category: 'mains' },
  ];

  const glutenFreeItems = [
    { id: 'gf-pancakes', name: 'Gluten-Free Pancakes', description: 'Almond flour pancakes with sugar-free syrup', price: 15.99, dietary: ['gluten-free', 'vegetarian'], image: '🥞', category: 'mains' },
    { id: 'quinoa-bowl', name: 'Quinoa Power Bowl', description: 'Quinoa with fresh vegetables and tahini dressing', price: 16.99, dietary: ['gluten-free', 'vegan', 'vegetarian'], image: '🥗', category: 'mains' },
  ];

  const getMenuItems = React.useCallback(() => {
    let items = [...baseItems];
    
    if (flags.premiumItems) items = [...items, ...premiumItems];
    if (flags.dietaryPreference === 'vegan') items = [...items, ...veganItems];
    if (flags.dietaryPreference === 'gluten-free') items = [...items, ...glutenFreeItems];
    
    return items
      .filter(item => {
        if (flags.dietaryPreference === 'omnivore') return true;
        return item.dietary.includes(flags.dietaryPreference as string);
      })
      .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));
  }, [flags]);

  const applyDynamicPricing = (price: number) => {
    if (!flags.dynamicPricing) return price;
    const hash = price.toString().split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const multiplier = 0.9 + (hash & 15) / 100;
    return Math.round(price * multiplier * 100) / 100;
  };

  const menuItems = getMenuItems();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🥞</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brunch Menu</h2>
            <AnimatePresence mode="wait">
              <motion.p 
                key={flags.dietaryPreference as string}
                className="text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                Showing {flags.dietaryPreference} options
                {flags.premiumItems && ' • Premium'}
                {flags.dynamicPricing && ' • Dynamic Pricing'}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {flags.limitedTimeOffers && (
            <motion.div 
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              🔥 Limited Time: 20% Off!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {flags.personalizedRecommendations && (
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-200"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h3 className="font-semibold text-purple-900 mb-2">🎯 Recommended for you</h3>
            <p className="text-purple-700 text-sm">
              Based on your {flags.dietaryPreference} preferences, we suggest starting with our signature items!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <MenuItem
                item={{
                  ...item,
                  price: applyDynamicPricing(item.price),
                }}
                onAddToOrder={onAddToOrder}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items available</h3>
            <p className="text-gray-600">
              Try adjusting your dietary preferences to see more options.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};