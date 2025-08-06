'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { User, Award } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const flags = useFlags();
  
  const getDietaryEmoji = (preference: string) => {
    switch (preference) {
      case 'vegan': return '🌱';
      case 'vegetarian': return '🥗';
      case 'gluten-free': return '🌾';
      case 'omnivore': return '🍳';
      default: return '🍽️';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <User className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-600 block mb-1">Name</label>
          <input 
            id="name"
            type="text" 
            value="Demo User"
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Dietary Preference</label>
          <div className="w-full p-3 border border-gray-200 rounded-md bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getDietaryEmoji(flags.dietaryPreference as string)}</span>
              <span className="font-semibold text-gray-900 capitalize">
                {flags.dietaryPreference || 'omnivore'}
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full whitespace-nowrap">
                From LaunchDarkly
              </span>
            </div>
          </div>
        </div>
        {flags.loyaltyProgram && (
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Loyalty Points</label>
            <div className="w-full p-3 border border-gray-200 rounded-md bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-600" />
                <span className="font-semibold text-gray-900">
                  1,250 points
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full whitespace-nowrap">
                  Gold Tier
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};