'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flag, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 text-white shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * 100,
              scale: 0
            }}
            animate={{ 
              y: [null, -20, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Coffee className="h-8 w-8" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flag className="h-4 w-4 text-yellow-300" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">BrunchDarkly</h1>
              <motion.p 
                className="text-amber-100 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Feature Flags as Easy as Flipping Pancakes ✨
              </motion.p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              className="bg-white/20 backdrop-blur rounded-full px-4 py-2 flex items-center space-x-2"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Powered by LaunchDarkly</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};