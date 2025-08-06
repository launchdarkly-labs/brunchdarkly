'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { OrderItem } from '../types';

interface Props {
  order: OrderItem[];
}

export const NutritionInfo: React.FC<Props> = ({ order }) => {
  const totalCalories = order.reduce((sum, item) => sum + (item.calories || 0) * item.quantity, 0);
  const totalProtein = order.reduce((sum, item) => sum + (item.protein || 0) * item.quantity, 0);
  const allAllergens = Array.from(new Set(order.flatMap(item => item.allergens || [])));

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">Nutrition Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900">Calories</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{totalCalories}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Protein</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{totalProtein}g</p>
          </div>
        </div>

        {allAllergens.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Allergen Information</h3>
            <div className="flex flex-wrap gap-2">
              {allAllergens.map((allergen) => (
                <span
                  key={allergen}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-4">
          <p>* Nutritional information is approximate and may vary based on preparation methods.</p>
        </div>
      </div>
    </motion.div>
  );
};