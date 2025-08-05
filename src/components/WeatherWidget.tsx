import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Thermometer } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

export const WeatherWidget: React.FC = () => {
  const { weatherData, isLoading, error } = useWeather();

  if (isLoading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getWeatherInfo = (weatherData: any | null) => {
    if (!weatherData || !weatherData.current) {
      return {
        icon: <Cloud className="h-8 w-8 text-gray-500" />,
        title: 'Great Day for Brunch!',
        description: 'Any weather is perfect for delicious food',
        bg: 'from-gray-100 to-slate-100',
        border: 'border-gray-200'
      };
    }

    const temp = weatherData.current.temp;
    const condition = weatherData.current.weather[0].main.toLowerCase();

    if (condition.includes('sun') || condition.includes('clear')) {
      return {
        icon: <Sun className="h-8 w-8 text-yellow-500" />,
        title: `Perfect Brunch Weather! ${temp.toFixed(0)}°C`,
        description: 'Sunny skies call for fresh fruit and light dishes',
        bg: 'from-yellow-100 to-orange-100',
        border: 'border-yellow-200'
      };
    }
    if (condition.includes('rain')) {
      return {
        icon: <CloudRain className="h-8 w-8 text-blue-500" />,
        title: `Cozy Rainy Day ${temp.toFixed(0)}°C`,
        description: 'Perfect weather for warm comfort foods',
        bg: 'from-blue-100 to-slate-100',
        border: 'border-blue-200'
      };
    }
    if (temp < 10) {
      return {
        icon: <Thermometer className="h-8 w-8 text-blue-600" />,
        title: `Chilly Morning ${temp.toFixed(0)}°C`,
        description: 'Warm up with hearty hot dishes',
        bg: 'from-blue-100 to-indigo-100',
        border: 'border-blue-200'
      };
    }
    if (temp > 25) {
      return {
        icon: <Thermometer className="h-8 w-8 text-red-500" />,
        title: `Hot Summer Day ${temp.toFixed(0)}°C`,
        description: 'Cool and refreshing options recommended',
        bg: 'from-red-100 to-orange-100',
        border: 'border-red-200'
      };
    }
    return {
      icon: <Cloud className="h-8 w-8 text-gray-500" />,
      title: `Great Day for Brunch! ${temp.toFixed(0)}°C`,
      description: 'Any weather is perfect for delicious food',
      bg: 'from-gray-100 to-slate-100',
      border: 'border-gray-200'
    };
  };

  const weatherInfo = getWeatherInfo(weatherData || null);

  return (
    <motion.div
      className={`bg-gradient-to-r ${weatherInfo.bg} border ${weatherInfo.border} rounded-xl p-6 shadow-lg`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
        >
          {weatherInfo.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{weatherInfo.title}</h3>
          <p className="text-gray-700">{weatherInfo.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
