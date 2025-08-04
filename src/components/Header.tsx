import React from 'react';
import { Coffee, Flag } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Coffee className="h-8 w-8" />
              <Flag className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">BrunchDarkly</h1>
              <p className="text-amber-100 text-sm">Feature Flags as Easy as Flipping Pancakes</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2">
              <span className="text-sm font-medium">🥞 Demo Mode</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};