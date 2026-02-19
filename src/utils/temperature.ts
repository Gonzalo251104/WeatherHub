/**
 * Utility functions for temperature conversions and formatting
 */

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Convert Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

/**
 * Format temperature with unit symbol
 */
export const formatTemperature = (
  temp: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius',
  decimals: number = 0
): string => {
  const convertedTemp = unit === 'fahrenheit' ? celsiusToFahrenheit(temp) : temp;
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${convertedTemp.toFixed(decimals)}${symbol}`;
};

/**
 * Get temperature range string
 */
export const formatTemperatureRange = (
  min: number,
  max: number,
  unit: 'celsius' | 'fahrenheit' = 'celsius'
): string => {
  return `${formatTemperature(min, unit)} / ${formatTemperature(max, unit)}`;
};
