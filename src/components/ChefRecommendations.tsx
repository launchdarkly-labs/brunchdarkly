import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star } from 'lucide-react';

export const ChefRecommendations: React.FC = () => {
  const recommendations = [
    {
      id: 'chef-special-1',
      name: "Chef's Signature Stack",
      description: "Our award-winning pancakes with seasonal berry compote",
      emoji: '🥞',
      badge: "Chef's Choice"
    },
    {
      id: 'chef-special-2', 
      name: 'Artisan Avocado Creation',
      description: 'Perfectly seasoned avocado on house-made sourdough',
      emoji: '🥑',
      badge: 'Trending'
    },
    {
      id: 'chef-special-3',
      name: 'Golden Benedict Royale',
      description: 'Premium eggs benedict with our secret hollandaise',
      emoji: '🍳',
      badge: 'Popular'
    }
  ];

  return (
    <motion.div
      className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <ChefHat className="h-8 w-8 text-amber-600" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chef's Recommendations</h2>
          <p className="text-amber-700">Handpicked favorites from our kitchen</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-3xl">{item.emoji}</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 whitespace-nowrap">
                <Star className="h-3 w-3 fill-current" />
                <span>{item.badge}</span>
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};