import React, { useState } from 'react';
import { FeatureFlags } from '../hooks/useLaunchDarkly';
import { OrderItem } from '../App';
import { Plus, Star } from 'lucide-react';

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
  flags: FeatureFlags;
}

export const MenuItem: React.FC<Props> = ({ item, onAddToOrder, flags }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToOrder = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
    
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
      case 'vegetarian': return 'bg-blue-100 text-blue-800';
      case 'gluten-free': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const discountedPrice = flags.limitedTimeOffers && Math.random() > 0.5 
    ? item.price * 0.8 
    : item.price;

  const isDiscounted = discountedPrice < item.price;

  return (
    <div 
      className={`bg-white border-2 border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-orange-200 ${isHovered ? 'transform -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-4xl transform transition-transform duration-300 hover:scale-110">
            {item.image}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
            {item.category === 'premium' && (
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-yellow-600">Premium</span>
              </div>
            )}
          </div>
        </div>
        
        {flags.loyaltyProgram && (
          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            +{Math.floor(item.price)} pts
          </div>
        )}
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

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isDiscounted && (
            <span className="text-gray-400 line-through text-sm">${item.price.toFixed(2)}</span>
          )}
          <span className={`font-bold text-lg ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
            ${discountedPrice.toFixed(2)}
          </span>
          {isDiscounted && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              20% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleAddToOrder}
          disabled={isAdding}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isAdding 
              ? 'bg-green-500 text-white scale-105' 
              : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105'
          }`}
        >
          <Plus className={`h-4 w-4 transition-transform duration-300 ${isAdding ? 'rotate-90' : ''}`} />
          <span>{isAdding ? 'Added!' : 'Add'}</span>
        </button>
      </div>
    </div>
  );
};