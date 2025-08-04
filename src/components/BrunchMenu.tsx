import React from 'react';
import { FeatureFlags } from '../hooks/useLaunchDarkly';
import { OrderItem } from '../App';
import { MenuItem } from './MenuItem';
import { AnimatedPancake } from './AnimatedPancake';

interface Props {
  flags: FeatureFlags;
  onAddToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
}

export const BrunchMenu: React.FC<Props> = ({ flags, onAddToOrder }) => {
  const baseItems = [
    {
      id: 'pancakes',
      name: 'Classic Pancakes',
      description: 'Fluffy buttermilk pancakes with maple syrup',
      price: 12.99,
      dietary: ['vegetarian'],
      image: '🥞',
      category: 'mains',
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      description: 'Smashed avocado on artisan sourdough',
      price: 14.99,
      dietary: ['vegan', 'vegetarian'],
      image: '🥑',
      category: 'mains',
    },
    {
      id: 'eggs-benedict',
      name: 'Eggs Benedict',
      description: 'Poached eggs with hollandaise on English muffins',
      price: 16.99,
      dietary: ['omnivore'],
      image: '🍳',
      category: 'mains',
    },
    {
      id: 'french-toast',
      name: 'French Toast',
      description: 'Brioche French toast with berry compote',
      price: 13.99,
      dietary: ['vegetarian'],
      image: '🍞',
      category: 'mains',
    },
  ];

  const premiumItems = [
    {
      id: 'truffle-scramble',
      name: 'Truffle Scrambled Eggs',
      description: 'Organic eggs with black truffle shavings',
      price: 28.99,
      dietary: ['vegetarian'],
      image: '🍄',
      category: 'premium',
    },
    {
      id: 'lobster-benedict',
      name: 'Lobster Benedict',
      description: 'Fresh lobster with hollandaise on brioche',
      price: 34.99,
      dietary: ['omnivore'],
      image: '🦞',
      category: 'premium',
    },
  ];

  const veganItems = [
    {
      id: 'vegan-pancakes',
      name: 'Vegan Pancakes',
      description: 'Plant-based pancakes with coconut whipped cream',
      price: 13.99,
      dietary: ['vegan', 'vegetarian'],
      image: '🥞',
      category: 'mains',
    },
    {
      id: 'tofu-scramble',
      name: 'Tofu Scramble',
      description: 'Seasoned tofu with vegetables and nutritional yeast',
      price: 12.99,
      dietary: ['vegan', 'vegetarian'],
      image: '🌿',
      category: 'mains',
    },
  ];

  const glutenFreeItems = [
    {
      id: 'gf-pancakes',
      name: 'Gluten-Free Pancakes',
      description: 'Almond flour pancakes with sugar-free syrup',
      price: 15.99,
      dietary: ['gluten-free', 'vegetarian'],
      image: '🥞',
      category: 'mains',
    },
    {
      id: 'quinoa-bowl',
      name: 'Quinoa Power Bowl',
      description: 'Quinoa with fresh vegetables and tahini dressing',
      price: 16.99,
      dietary: ['gluten-free', 'vegan', 'vegetarian'],
      image: '🥗',
      category: 'mains',
    },
  ];

  const getMenuItems = () => {
    let items = [...baseItems];
    
    if (flags.premiumItems) {
      items = [...items, ...premiumItems];
    }
    
    if (flags.dietaryPreference === 'vegan') {
      items = [...items, ...veganItems];
    }
    
    if (flags.dietaryPreference === 'gluten-free') {
      items = [...items, ...glutenFreeItems];
    }
    
    // Filter items based on dietary preference
    return items.filter(item => {
      if (flags.dietaryPreference === 'omnivore') return true;
      return item.dietary.includes(flags.dietaryPreference);
    });
  };

  const applyDynamicPricing = (price: number) => {
    if (!flags.dynamicPricing) return price;
    const multiplier = 0.9 + Math.random() * 0.2; // 90% to 110% of original price
    return Math.round(price * multiplier * 100) / 100;
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <AnimatedPancake />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brunch Menu</h2>
            <p className="text-gray-600">
              Showing {flags.dietaryPreference} options
              {flags.premiumItems && ' • Premium items included'}
              {flags.dynamicPricing && ' • Dynamic pricing active'}
            </p>
          </div>
        </div>
        
        {flags.limitedTimeOffers && (
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            🔥 Limited Time: 20% Off!
          </div>
        )}
      </div>

      {flags.personalizedRecommendations && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2">🎯 Recommended for you</h3>
          <p className="text-purple-700 text-sm">
            Based on your {flags.dietaryPreference} preferences, we suggest starting with our signature items!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={{
              ...item,
              price: applyDynamicPricing(item.price),
            }}
            onAddToOrder={onAddToOrder}
            flags={flags}
          />
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items available</h3>
          <p className="text-gray-600">
            Try adjusting your dietary preferences to see more options.
          </p>
        </div>
      )}
    </div>
  );
};