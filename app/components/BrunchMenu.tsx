'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { OrderItem } from '../types';
import { MenuItem } from './MenuItem';
import { useWeather } from '../hooks/useWeather';

interface BrunchMenuProps {
  onAddToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
  addingItems: Set<string>;
}

export function BrunchMenu({ onAddToOrder, addingItems }: BrunchMenuProps) {
  const flags = useFlags();
  const { weatherCondition } = useWeather();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const menuItems = [
    {
      id: 'pancakes',
      name: 'Fluffy Pancakes',
      price: 25.98,
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegetarian'],
      category: 'mains',
      calories: 450,
      protein: 8,
      allergens: ['gluten', 'eggs', 'dairy'],
      description: 'Stack of three fluffy pancakes with maple syrup and butter'
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      price: 29.98,
      image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegan', 'healthy'],
      category: 'mains',
      calories: 320,
      protein: 12,
      allergens: ['gluten'],
      description: 'Smashed avocado on sourdough with cherry tomatoes and hemp seeds'
    },
    {
      id: 'eggs-benedict',
      name: 'Eggs Benedict',
      price: 33.98,
      image: 'https://images.pexels.com/photos/7663367/pexels-photo-7663367.jpeg',
      dietary: ['premium'],
      category: 'mains',
      calories: 580,
      protein: 25,
      allergens: ['eggs', 'dairy', 'gluten'],
      description: 'Poached eggs on English muffin with hollandaise sauce'
    },
    {
      id: 'acai-bowl',
      name: 'Açaí Bowl',
      price: 27.98,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegan', 'healthy', 'gluten-free'],
      category: 'bowls',
      calories: 280,
      protein: 6,
      allergens: [],
      description: 'Açaí blend topped with granola, berries, and coconut flakes'
    },
    {
      id: 'french-toast',
      name: 'French Toast',
      price: 27.98,
      image: 'https://images.pexels.com/photos/30900620/pexels-photo-30900620.jpeg',
      dietary: ['vegetarian'],
      category: 'mains',
      calories: 520,
      protein: 15,
      allergens: ['eggs', 'dairy', 'gluten'],
      description: 'Thick-cut brioche French toast with cinnamon and vanilla'
    },
    {
      id: 'quinoa-bowl',
      name: 'Quinoa Power Bowl',
      price: 31.98,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegan', 'healthy', 'gluten-free'],
      category: 'bowls',
      calories: 420,
      protein: 18,
      allergens: [],
      description: 'Quinoa with roasted vegetables, chickpeas, and tahini dressing'
    },
    {
      id: 'truffle-scramble',
      name: 'Truffle Scrambled Eggs',
      price: 45.98,
      image: 'https://images.pexels.com/photos/2739268/pexels-photo-2739268.jpeg',
      dietary: ['premium', 'vegetarian'],
      category: 'premium',
      calories: 380,
      protein: 20,
      allergens: ['eggs', 'dairy'],
      description: 'Creamy scrambled eggs with truffle oil and chives',
      chefRecommendation: true
    },
    {
      id: 'wagyu-burger',
      name: 'Wagyu Brunch Burger',
      price: 57.98,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['premium'],
      category: 'premium',
      calories: 720,
      protein: 35,
      allergens: ['gluten', 'eggs', 'dairy'],
      description: 'Wagyu beef patty with fried egg and truffle aioli',
      chefRecommendation: true
    },
    {
      id: 'mimosa-flight',
      name: 'Mimosa Flight',
      price: 37.98,
      image: 'https://images.pexels.com/photos/33309414/pexels-photo-33309414.jpeg',
      dietary: ['drinks'],
      category: 'premium',
      calories: 250,
      protein: 1,
      allergens: [],
      description: 'A flight of four different mimosas: classic, strawberry, mango, and pineapple',
      special: true
    },
    {
      id: 'lobster-benedict',
      name: 'Lobster Benedict',
      price: 65.98,
      image: 'https://images.pexels.com/photos/8352391/pexels-photo-8352391.jpeg',
      dietary: ['premium'],
      category: 'premium',
      calories: 650,
      protein: 30,
      allergens: ['eggs', 'dairy', 'gluten', 'shellfish'],
      description: 'A luxurious take on the classic eggs benedict with fresh lobster meat',
      special: true
    }
  ];

  // Filter items based on feature flags and preferences
  const filteredItems = menuItems.filter(item => {
    // Dietary preference filter
    if (flags.dietaryPreference && flags.dietaryPreference !== 'all' && flags.dietaryPreference !== 'omnivore') {
      if (!item.dietary.includes(flags.dietaryPreference)) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  // Apply dynamic pricing
  const itemsWithDynamicPricing = filteredItems.map(item => {
    let adjustedPrice = item.price;
    
    if (flags.dynamicPricing) {
      // Weather-based pricing
      if (weatherCondition === 'rainy') {
        adjustedPrice *= 0.9; // 10% discount on all items when rainy
      }
      if (weatherCondition === 'sunny') {
        adjustedPrice *= 1.1; // 10% premium on all items when sunny
      }
    }
    
    return { ...item, price: Math.round(adjustedPrice * 100) / 100 };
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'mains', name: 'Mains', icon: '🥞' },
    { id: 'bowls', name: 'Bowls', icon: '🥗' },
    flags.premiumItems && { id: 'premium', name: 'Premium', icon: '⭐' }
  ].filter(Boolean);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Brunch Menu</h2>
          <p className="text-gray-600">Delicious options for every taste</p>
        </div>
        
        {flags.weatherBasedMenu && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Weather-optimized menu</p>
            <p className="text-lg font-semibold text-emerald-600 capitalize">{weatherCondition}</p>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Limited Time Offers Banner */}
      {flags.limitedTimeOffers && (
        <motion.div
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔥</span>
            <div>
              <h3 className="font-bold">Limited Time Offer!</h3>
              <p className="text-sm opacity-90">20% off all premium items this weekend</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itemsWithDynamicPricing.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToOrder={onAddToOrder}
            isAdding={addingItems.has(item.id)}
            delay={index * 0.1}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No items match your preferences</h3>
          <p className="text-gray-500">Try adjusting your filters or dietary preferences</p>
        </div>
      )}
    </motion.div>
  );
}
