import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { Plus, Minus, ShoppingCart, Coffee, Eye, X } from 'lucide-react';
import { OrderItem } from './types';

function App() {
  const flags = useFlags();
  const ldClient = useLDClient();
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (ldClient && Object.keys(flags).length > 0) {
      setIsLoading(false);
    }
  }, [ldClient, flags]);

  const menuItems = [
    {
      id: 'pancakes',
      name: 'Fluffy Pancakes',
      price: 12.99,
      image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegetarian', 'omnivore']
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegan', 'vegetarian', 'omnivore']
    },
    {
      id: 'eggs-benedict',
      name: 'Eggs Benedict',
      price: 16.99,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['omnivore']
    },
    {
      id: 'acai-bowl',
      name: 'Açaí Bowl',
      price: 13.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      dietary: ['vegan', 'vegetarian', 'omnivore']
    }
  ];

  // Filter items based on dietary preference
  const filteredItems = menuItems.filter(item => {
    const dietaryPreference = flags.dietaryPreference as string;
    if (!dietaryPreference || dietaryPreference === 'all') {
      return true;
    }
    return item.dietary.includes(dietaryPreference);
  });

  const addToOrder = (item: any) => {
    console.log('Adding to order:', item.name);
    setOrder(prev => {
      const existing = prev.find(orderItem => orderItem.id === item.id);
      if (existing) {
        return prev.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    console.log('Updating quantity:', id, newQuantity);
    if (newQuantity <= 0) {
      setOrder(prev => prev.filter(item => item.id !== id));
    } else {
      setOrder(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🥞</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BrunchDarkly</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coffee className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">BrunchDarkly</h1>
                <p className="text-amber-100 text-sm">Feature Flags as Easy as Flipping Pancakes</p>
              </div>
            </div>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="bg-white/20 backdrop-blur rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-white/30 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdmin(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Feature Flags</h2>
                  <button
                    onClick={() => setShowAdmin(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {Object.entries(flags).map(([flagKey, flagValue]) => (
                  <div key={flagKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 capitalize">
                      {flagKey.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {String(flagValue)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Brunch Menu</h2>
              
              {flags.dietaryPreference && flags.dietaryPreference !== 'all' && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    Showing {flags.dietaryPreference} options
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ y: -2 }}
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
                        onClick={() => addToOrder(item)}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No items match your preferences</h3>
                  <p className="text-gray-500">Try changing your dietary preference in LaunchDarkly</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
              </div>

              {order.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {order.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-emerald-600 font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;