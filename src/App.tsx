import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { Header } from './components/Header';
import { BrunchMenu } from './components/BrunchMenu';
import { OrderSummary } from './components/OrderSummary';
import { LoadingScreen } from './components/LoadingScreen';
import { Plate } from './components/Plate';
import { Checkout } from './components/Checkout';
import { UserProfile } from './components/UserProfile';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  dietary: string[];
  quantity: number;
  image: string;
}

function App() {
  const flags = useFlags();
  const ldClient = useLDClient();

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (ldClient && Object.keys(flags).length > 0) {
      setIsLoading(false);
      ldClient.track('page_view', { path: 'brunch_menu' });
    }
  }, [ldClient, flags]);

  const addToOrder = (item: Omit<OrderItem, 'quantity'>) => {
    ldClient?.track('order_item_added', {
      item_id: item.id,
      item_name: item.name,
      item_price: item.price,
    });

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

  const handleCheckout = () => {
    ldClient?.track('order_placed', {
      total: order.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: order.map(item => item.id),
    });
    setIsCheckout(true);
  };

  if (isCheckout) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <motion.div 
            className="text-8xl mb-8"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            🎉
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-600">Thanks for your order! Your delicious brunch is on its way.</p>
          <button 
            onClick={() => {
              setOrder([]);
              setIsCheckout(false);
            }}
            className="mt-8 bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg"
          >
            Order Again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 space-y-8 lg:sticky top-8">
                <UserProfile />
                <Plate order={order} />
                <Checkout order={order} onCheckout={handleCheckout} />
              </div>

              <div className="lg:col-span-2 space-y-8">
                <BrunchMenu onAddToOrder={addToOrder} />
                <OrderSummary order={order} setOrder={setOrder} />
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;