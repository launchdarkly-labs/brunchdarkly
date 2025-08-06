'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart } from 'lucide-react';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const PersonalizedRecommendations: React.FC = () => {
  const flags = useFlags();

  const recommendations = [
    {
      id: 'rec-1',
      name: 'Açaí Bowl',
      reason: 'Because you love healthy options!',
      emoji: '🍓'
    },
    {
      id: 'rec-2',
      name: 'Truffle Scrambled Eggs',
      reason: 'A treat for a premium lover like you.',
      emoji: '✨'
    },
    {
      id: 'rec-3',
      name: 'Avocado Toast',
      reason: 'A popular choice you might enjoy.',
      emoji: '🥑'
    }
  ];

  if (!flags.personalizedRecommendations) {
    return null;
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 shadow-lg mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Sparkles className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Just For You</h2>
          <p className="text-purple-700">Our AI-powered recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-3xl">{item.emoji}</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 whitespace-nowrap">
                {index === 0 ? <Heart className="h-3 w-3 fill-current" /> : <Zap className="h-3 w-3 fill-current" />}
                <span>{index === 0 ? "Top Pick" : "Try Next"}</span>
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.reason}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
