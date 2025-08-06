import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface WeatherData {
  current: {
    temp: number;
    weather: {
      main: string;
      description: string;
    }[];
  };
}

const fetchWeather = async (): Promise<WeatherData> => {
  const lat = 40.65;
  const lon = -73.95;
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const useWeather = () => {
  const { data, isLoading, error } = useQuery<WeatherData, Error>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  const weatherCondition = useMemo(() => {
    if (!data) return 'sunny'; // Default or loading state
    if(!data.current) return 'sunny';
    console.log(data.current);
    const condition = data.current.weather[0].main.toLowerCase();
    if (condition.includes('sun') || condition.includes('clear')) return 'sunny';
    if (condition.includes('rain')) return 'rainy';
    if (data.current.temp < 10) return 'cold';
    if (data.current.temp > 25) return 'hot';
    return 'cloudy';
  }, [data]);


  return { weatherData: data, isLoading, error, weatherCondition };
};
