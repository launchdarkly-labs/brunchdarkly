import React from 'react';
import { OrderItem } from '../App';
import { FeatureFlags } from '../hooks/useLaunchDarkly';
import { ShoppingCart, Trash2, Gift } from 'lucide-react';

interface Props {
  order: OrderItem[];
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  flags: FeatureFlags;
}

export const OrderSummary: React.FC<Props> = ({ order, setOrder, flags }) => {
  const removeFromOrder = (id: string) => {
    setOrder(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(id);
      return;
    }
    
    setOrder(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const loyaltyDiscount = flags.loyaltyProgram ? subtotal * 0.1 : 0;
  const total = subtotal - loyaltyDiscount;

  if (order.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
          {order.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>

      <div className="space-y-4 mb-6">
        {order.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.dietary.map((diet) => (
                  <span key={diet} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                    {diet}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromOrder(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {flags.loyaltyProgram && loyaltyDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <div className="flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span>Loyalty Discount (10%)</span>
            </div>
            <span>-${loyaltyDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
        Place Order 🍽️
      </button>

      {flags.loyaltyProgram && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">
              You'll earn {Math.floor(total)} loyalty points with this order!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};