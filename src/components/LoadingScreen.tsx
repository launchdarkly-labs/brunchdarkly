import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="text-center">
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-6xl mb-4">🥞</div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mt-6 mb-2"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          BrunchDarkly
        </motion.h1>

        <motion.p 
          className="text-gray-600 mb-8"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Loading the best brunch experience ever...
        </motion.p>
        
        <motion.div 
          className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-8 text-sm text-gray-500"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>🥞 Preparing feature flags...</p>
          <p className="mt-1">☕ Brewing your personalized menu...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};