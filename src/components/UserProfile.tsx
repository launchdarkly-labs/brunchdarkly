import React from 'react';
import { motion } from 'framer-motion';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { LDContext } from 'launchdarkly-js-client-sdk';
import { User } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const ldClient = useLDClient();
  const context = ldClient?.getContext();

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (context) {
      const newContext: LDContext = {
        ...context,
        custom: {
          ...context.custom,
          dietaryPreference: e.target.value,
        },
      };
      ldClient.identify(newContext);
    }
  };

  if (!context) {
    return null;
  }

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
            value={context.name} 
            readOnly 
            className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor="preference" className="text-sm font-medium text-gray-600 block mb-1">Dietary Preference</label>
          <select
            id="preference"
            value={context.custom?.dietaryPreference as string || 'omnivore'}
            onChange={handlePreferenceChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="omnivore">🍳 Omnivore</option>
            <option value="vegetarian">🥗 Vegetarian</option>
            <option value="vegan">🌱 Vegan</option>
            <option value="gluten-free">🌾 Gluten-Free</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};