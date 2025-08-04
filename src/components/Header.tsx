import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flag } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Coffee className="h-8 w-8" />
              <Flag className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">BrunchDarkly</h1>
              <p className="text-amber-100 text-sm">Feature Flags as Easy as Flipping Pancakes</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              className="bg-white/20 backdrop-blur rounded-full px-4 py-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-sm font-medium">🥞 Demo Mode</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};