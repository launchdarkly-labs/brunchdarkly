import React from 'react';
import { motion } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ChefHat, Plus, AlertTriangle, Flame, Beef } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToOrder: (item: MenuItemType) => void;
  isAdding: boolean;
  delay: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToOrder, isAdding, delay }) => {
  const flags = useFlags();
  const [showNutrition, setShowNutrition] = React.useState(false);
  

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <span className="text-2xl font-bold text-emerald-600">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        {flags.chefRecommendations && item.chefRecommendation && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <ChefHat className="w-4 h-4 mr-1.5" />
              Chef's Recommendation
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {item.dietary.map((diet) => (
            <span
              key={diet}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
            >
              {diet}
            </span>
          ))}
        </div>

        


        <button
          onClick={() => onAddToOrder(item)}
          disabled={isAdding}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Plus className="h-5 w-5" />
          <span>{isAdding ? 'Adding...' : 'Add to Order'}</span>
        </button>

        {flags.nutritionInfo && (
          <div className="my-4">
            <button
              onClick={() => setShowNutrition(!showNutrition)}
              className="text-xs text-gray-500 hover:text-gray-900 font-medium"
            >
              {showNutrition ? 'Hide' : 'Show'} Nutrition Info
            </button>
            {showNutrition && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-700">
                  <Flame className="w-4 h-4 mr-2 text-red-500" />
                  <span>{item.calories} calories</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 mt-1">
                  <Beef className="w-4 h-4 mr-2 text-yellow-600" />
                  <span>{item.protein}g protein</span>
                </div>
              </div>
            )}
          </div>
        )}

        {flags.allergenWarnings && item.allergens && item.allergens.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-xs text-yellow-600 font-medium">
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Contains: {item.allergens.join(', ')}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};
