import React, { useState, useEffect } from 'react';
import { useLaunchDarkly } from './hooks/useLaunchDarkly';
import { analyticsService } from './services/analytics';
import { Header } from './components/Header';
import { LaunchDarklyDashboard } from './components/LaunchDarklyDashboard';
import { BrunchMenu } from './components/BrunchMenu';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { OrderSummary } from './components/OrderSummary';
import { LoadingScreen } from './components/LoadingScreen';

export interface Analytics {
  pageViews: number;
  orderConversions: number;
  averageOrderValue: number;
  userEngagement: number;
  flagToggles: number;
  mostPopularItems: string[];
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  dietary: string[];
  quantity: number;
}

function App() {
  const { flags, isLoading, isConnected, trackFlagInteraction, updateUserContext, user } = useLaunchDarkly();

  const [analytics, setAnalytics] = useState<Analytics>({
    pageViews: 1247,
    orderConversions: 89,
    averageOrderValue: 24.50,
    userEngagement: 76,
    flagToggles: 0,
    mostPopularItems: ['Avocado Toast', 'Pancakes', 'Eggs Benedict'],
  });

  const [order, setOrder] = useState<OrderItem[]>([]);

  // Initialize analytics
  useEffect(() => {
    analyticsService.initialize();
    analyticsService.startSession();
    analyticsService.trackPageView('brunch_menu');
    
    // Set session start time for duration tracking
    (window as any).sessionStartTime = Date.now();

    return () => {
      analyticsService.endSession();
    };
  }, []);

  // Track user identification
  useEffect(() => {
    if (user) {
      analyticsService.identify(user.key, {
        email: user.email,
        name: user.name,
        dietaryPreference: flags.dietaryPreference,
        loyaltyTier: user.custom?.loyaltyTier,
        location: user.custom?.location
      });
    }
  }, [user, flags.dietaryPreference]);

  const updateFlag = (key: keyof typeof flags, value: any) => {
    trackFlagInteraction(key, value, {
      previous_value: flags[key],
      interaction_type: 'manual_toggle'
    });
    
    setAnalytics(prev => ({ 
      ...prev, 
      flagToggles: prev.flagToggles + 1,
      userEngagement: Math.min(100, prev.userEngagement + 2)
    }));
  };

  const addToOrder = (item: Omit<OrderItem, 'quantity'>) => {
    analyticsService.trackOrderEvent('item_added', {
      item_id: item.id,
      item_name: item.name,
      item_price: item.price,
      dietary_tags: item.dietary,
      user_dietary_preference: flags.dietaryPreference
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
    
    setAnalytics(prev => ({ 
      ...prev, 
      orderConversions: prev.orderConversions + 1 
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature Flag Controls */}
          <div className="lg:col-span-1">
            <LaunchDarklyDashboard 
              flags={flags} 
              updateFlag={updateFlag} 
              isConnected={isConnected}
              user={user}
            />
            <div className="mt-8">
              <AnalyticsDashboard analytics={analytics} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <BrunchMenu flags={flags} onAddToOrder={addToOrder} />
            <div className="mt-8">
              <OrderSummary order={order} setOrder={setOrder} flags={flags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;