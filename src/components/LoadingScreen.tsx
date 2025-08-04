import React from 'react';
import { Coffee, Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Coffee className="h-16 w-16 text-amber-600 mx-auto animate-bounce" />
          <Loader2 className="h-6 w-6 text-orange-500 absolute -bottom-2 -right-2 animate-spin" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">BrunchDarkly</h1>
        <p className="text-gray-600 mb-6">Initializing LaunchDarkly SDK...</p>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>🥞 Loading feature flags...</p>
          <p className="mt-1">☕ Brewing the perfect experience...</p>
        </div>
      </div>
    </div>
  );
};