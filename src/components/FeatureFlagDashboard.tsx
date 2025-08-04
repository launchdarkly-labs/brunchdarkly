import React from 'react';
import { FeatureFlags } from '../App';
import { ToggleLeft as Toggle, TrendingUp, Users, DollarSign, Heart, Clock } from 'lucide-react';

interface Props {
  flags: FeatureFlags;
  updateFlag: (key: keyof FeatureFlags, value: any) => void;
}

export const FeatureFlagDashboard: React.FC<Props> = ({ flags, updateFlag }) => {
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
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Toggle className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Feature Flags</h2>
      </div>

      <div className="space-y-4">
        {flagConfigs.map((config) => (
          <div key={config.key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-indigo-600">{config.icon}</div>
                  <h3 className="font-semibold text-gray-900">{config.name}</h3>
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
    </div>
  );
};