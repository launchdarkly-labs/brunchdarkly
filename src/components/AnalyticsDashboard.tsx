import React from 'react';
import { Analytics } from '../App';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

interface Props {
  analytics: Analytics;
}

export const AnalyticsDashboard: React.FC<Props> = ({ analytics }) => {
  const stats = [
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: <Users className="h-5 w-5" />,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Conversions',
      value: analytics.orderConversions.toString(),
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Avg Order',
      value: `$${analytics.averageOrderValue.toFixed(2)}`,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      label: 'Flag Toggles',
      value: analytics.flagToggles.toString(),
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <span className="font-medium text-gray-700">{stat.label}</span>
            </div>
            <span className="font-bold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
        <h3 className="font-semibold text-indigo-900 mb-2">Engagement Score</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${analytics.userEngagement}%` }}
            ></div>
          </div>
          <span className="font-bold text-indigo-900">{analytics.userEngagement}%</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Popular Items</h3>
        <div className="space-y-2">
          {analytics.mostPopularItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">#{index + 1} {item}</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${100 - index * 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};