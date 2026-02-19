/**
 * Weather-related utility functions
 */

import { WEATHER_CONDITIONS } from '../constants';

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Get weather condition emoji based on condition code
 */
export const getWeatherEmoji = (conditionCode: number): string => {
  for (const condition of Object.values(WEATHER_CONDITIONS)) {
    const [min, max] = condition.range;
    if (conditionCode >= min && conditionCode <= max) {
      return condition.icon;
    }
  }
  return '🌡️'; // Default thermometer icon
};

/**
 * Get weather condition label
 */
export const getWeatherLabel = (conditionCode: number): string => {
  for (const condition of Object.values(WEATHER_CONDITIONS)) {
    const [min, max] = condition.range;
    if (conditionCode >= min && conditionCode <= max) {
      return condition.label;
    }
  }
  return 'Unknown';
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Convert wind speed from m/s to km/h
 */
export const msToKmh = (ms: number): number => {
  return ms * 3.6;
};

/**
 * Convert wind speed from m/s to mph
 */
export const msToMph = (ms: number): number => {
  return ms * 2.237;
};

/**
 * Format wind speed with unit
 */
export const formatWindSpeed = (ms: number, unit: 'metric' | 'imperial' = 'metric'): string => {
  if (unit === 'imperial') {
    return `${msToMph(ms).toFixed(1)} mph`;
  }
  return `${msToKmh(ms).toFixed(1)} km/h`;
};

/**
 * Get UV index category
 */
export const getUVIndexCategory = (uvi: number): { level: string; color: string } => {
  if (uvi <= 2) return { level: 'Low', color: 'text-green-600' };
  if (uvi <= 5) return { level: 'Moderate', color: 'text-yellow-600' };
  if (uvi <= 7) return { level: 'High', color: 'text-orange-600' };
  if (uvi <= 10) return { level: 'Very High', color: 'text-red-600' };
  return { level: 'Extreme', color: 'text-purple-600' };
};

/**
 * Get air quality index description
 */
export const getAQIDescription = (aqi: number): { label: string; color: string } => {
  const descriptions = [
    { label: 'Good', color: 'text-green-600' },
    { label: 'Fair', color: 'text-yellow-500' },
    { label: 'Moderate', color: 'text-orange-500' },
    { label: 'Poor', color: 'text-red-600' },
    { label: 'Very Poor', color: 'text-purple-600' },
  ];
  return descriptions[aqi - 1] || descriptions[0];
};

/**
 * Get humidity description
 */
export const getHumidityDescription = (humidity: number): string => {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Very Humid';
};

/**
 * Calculate dew point from temperature and humidity
 */
export const calculateDewPoint = (temp: number, humidity: number): number => {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
};

/**
 * Get weather description with proper capitalization
 */
export const capitalizeWeatherDescription = (description: string): string => {
  return description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Determine if it's daytime based on current time, sunrise, and sunset
 */
export const isDaytime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime < sunset;
};
