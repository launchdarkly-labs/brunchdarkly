import React from 'react';
import { FeatureFlags } from '../hooks/useLaunchDarkly';
import { LaunchDarklyUser } from '../services/launchDarkly';
import { Flag, TrendingUp, Users, DollarSign, Heart, Clock, Wifi, WifiOff, User } from 'lucide-react';

interface Props {
  flags: FeatureFlags;
  updateFlag: (key: keyof FeatureFlags, value: any) => void;
  isConnected: boolean;
  user: LaunchDarklyUser;
}

export const LaunchDarklyDashboard: React.FC<Props> = ({ flags, updateFlag, isConnected, user }) => {
  const flagConfigs = [
    {
      key: 'dietaryPreference' as keyof FeatureFlags,
      name: 'Dietary Preference',
      description: 'Target specific dietary needs',
      icon: <Heart className="h-5 w-5" />,
      type: 'select',
      options: [
        { value: 'omnivore', label: '🍳 Omnivore', color: 'bg-orange-100 text-orange-800' },
        { value: 'vegetarian', label: '🥗 Vegetarian', color: 'bg-green-100 text-green-800' },
        { value: 'vegan', label: '🌱 Vegan', color: 'bg-emerald-100 text-emerald-800' },
        { value: 'gluten-free', label: '🌾 Gluten-Free', color: 'bg-blue-100 text-blue-800' },
      ],
    },
    {
      key: 'premiumItems' as keyof FeatureFlags,
      name: 'Premium Items',
      description: 'Show premium brunch options',
      icon: <TrendingUp className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'dynamicPricing' as keyof FeatureFlags,
      name: 'Dynamic Pricing',
      description: 'Adjust prices based on demand',
      icon: <DollarSign className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'personalizedRecommendations' as keyof FeatureFlags,
      name: 'Personalized Recommendations',
      description: 'AI-powered food suggestions',
      icon: <Users className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'loyaltyProgram' as keyof FeatureFlags,
      name: 'Loyalty Program',
      description: 'Show loyalty rewards',
      icon: <Heart className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'limitedTimeOffers' as keyof FeatureFlags,
      name: 'Limited Time Offers',
      description: 'Display special promotions',
      icon: <Clock className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'weekendSpecials' as keyof FeatureFlags,
      name: 'Weekend Specials',
      description: 'Show weekend-only items',
      icon: <Clock className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'chefRecommendations' as keyof FeatureFlags,
      name: 'Chef Recommendations',
      description: 'Highlight chef favorites',
      icon: <TrendingUp className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'nutritionInfo' as keyof FeatureFlags,
      name: 'Nutrition Info',
      description: 'Display nutritional data',
      icon: <Heart className="h-5 w-5" />,
      type: 'toggle',
    },
    {
      key: 'allergenWarnings' as keyof FeatureFlags,
      name: 'Allergen Warnings',
      description: 'Show allergen information',
      icon: <Heart className="h-5 w-5" />,
      type: 'toggle',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Flag className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">LaunchDarkly</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <div className="flex items-center space-x-1 text-green-600">
              <Wifi className="h-4 w-4" />
              <span className="text-xs font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-amber-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-xs font-medium">Mock Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* User Context */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <User className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-gray-900">User Context</span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Key:</strong> {user.key.substring(0, 8)}...</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Location:</strong> {user.custom?.location}</p>
          <p><strong>Loyalty Tier:</strong> {user.custom?.loyaltyTier}</p>
          <p><strong>Previous Orders:</strong> {user.custom?.previousOrders}</p>
        </div>
      </div>

      <div className="space-y-4">
        {flagConfigs.map((config) => (
          <div key={config.key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-indigo-600">{config.icon}</div>
                  <h3 className="font-semibold text-gray-900">{config.name}</h3>
                  {!isConnected && (
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      Mock
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{config.description}</p>

                {config.type === 'toggle' ? (
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={flags[config.key] as boolean}
                        onChange={(e) => updateFlag(config.key, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`block w-14 h-8 rounded-full transition-colors ${
                        flags[config.key] ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                          flags[config.key] ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {flags[config.key] ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                ) : (
                  <select
                    value={flags[config.key] as string}
                    onChange={(e) => updateFlag(config.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {config.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {config.key === 'dietaryPreference' && (
              <div className="mt-3 flex flex-wrap gap-2">
                {config.options?.map((option) => (
                  <span
                    key={option.value}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      flags.dietaryPreference === option.value
                        ? option.color
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!isConnected && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2">🚀 Connect to LaunchDarkly</h3>
          <p className="text-sm text-amber-700 mb-3">
            To see real feature flags in action, add your LaunchDarkly client-side ID to the environment variables.
          </p>
          <div className="text-xs text-amber-600 font-mono bg-amber-100 p-2 rounded">
            VITE_LAUNCHDARKLY_CLIENT_ID=your_client_side_id_here
          </div>
        </div>
      )}
    </div>
  );
};