/**
 * Application-specific type definitions
 */

export type Theme = 'light' | 'dark';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

/**
 * Favorite city saved by the user
 */
export interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: number;
}

/**
 * User preferences stored in localStorage
 */
export interface UserPreferences {
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  favoriteCities: FavoriteCity[];
  lastSearchedCity?: string;
}

/**
 * Application error with user-friendly message
 */
export interface AppError {
  code: string;
  message: string;
  originalError?: Error;
}

/**
 * Loading state for async operations
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Chart data point for temperature trends
 */
export interface ChartDataPoint {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation?: number;
}

/**
 * Weather map layer types
 */
export type WeatherMapLayer = 'temp' | 'precipitation' | 'clouds' | 'wind' | 'pressure';

/**
 * Geolocation result
 */
export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}
