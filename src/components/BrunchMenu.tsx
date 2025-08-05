import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { MenuItem } from './MenuItem';
import { OrderItem } from '../App';

interface BrunchMenuProps {
  onAddToOrder: (item: Omit<OrderItem, 'quantity'>) => void;
  weather: string;
  addingItems: Set<string>;
}

export function BrunchMenu({ onAddToOrder, weather, addingItems }: BrunchMenuProps) {
  const flags = useFlags();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const menuItems = [
    {
      id: 'pancakes',
      name: 'Fluffy Pancakes',
      price: 12.99,
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
      price: 14.99,
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
      price: 16.99,
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      price: 13.99,
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
      price: 13.99,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      price: 15.99,
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
      price: 22.99,
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['premium', 'vegetarian'],
      category: 'premium',
      calories: 380,
      protein: 20,
      allergens: ['eggs', 'dairy'],
      description: 'Creamy scrambled eggs with truffle oil and chives'
    },
    {
      id: 'wagyu-burger',
      name: 'Wagyu Brunch Burger',
      price: 28.99,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['premium'],
      category: 'premium',
      calories: 720,
      protein: 35,
      allergens: ['gluten', 'eggs', 'dairy'],
      description: 'Wagyu beef patty with fried egg and truffle aioli'
    }
  ];

  // Filter items based on feature flags and preferences
  const filteredItems = menuItems.filter(item => {
    // Premium items filter
    if (item.dietary.includes('premium') && !flags.premiumItems) {
      return false;
    }

    // Dietary preference filter
    if (flags.dietaryPreference && flags.dietaryPreference !== 'all') {
      if (!item.dietary.includes(flags.dietaryPreference)) {
        return false;
      }
    }

    // Weather-based filtering
    if (flags.weatherBasedMenu) {
      if (weather === 'cold' && !['pancakes', 'french-toast', 'truffle-scramble'].includes(item.id)) {
        return false;
      }
      if (weather === 'hot' && !['acai-bowl', 'avocado-toast', 'quinoa-bowl'].includes(item.id)) {
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
      if (weather === 'rainy' && item.dietary.includes('healthy')) {
        adjustedPrice *= 0.9; // 10% discount on healthy items when rainy
      }
      if (weather === 'sunny' && item.category === 'bowls') {
        adjustedPrice *= 1.1; // 10% premium on bowls when sunny
      }
      
      // Time-based pricing (simulate peak hours)
      const hour = new Date().getHours();
      if (hour >= 10 && hour <= 12) { // Peak brunch hours
        adjustedPrice *= 1.05; // 5% peak hour surcharge
      }
    }
    
    return { ...item, price: Math.round(adjustedPrice * 100) / 100 };
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'mains', name: 'Mains', icon: '🥞' },
    { id: 'bowls', name: 'Bowls', icon: '🥗' },
    { id: 'premium', name: 'Premium', icon: '⭐' }
  ];

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
            <p className="text-lg font-semibold text-emerald-600 capitalize">{weather}</p>
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