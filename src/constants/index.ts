/**
 * Application configuration constants
 */

export const CONFIG = {
  OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
  OPENWEATHER_BASE_URL: import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  DEFAULT_CITY: 'London',
  DEFAULT_UNITS: 'metric' as const,
  FORECAST_DAYS: 5,
  MAX_FAVORITE_CITIES: 10,
} as const;

/**
 * API endpoints for OpenWeatherMap
 */
export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  GEOCODING: '/geo/1.0/direct',
  REVERSE_GEOCODING: '/geo/1.0/reverse',
  AIR_POLLUTION: '/air_pollution',
  ONE_CALL: '/onecall',
} as const;

/**
 * LocalStorage keys for persistent data
 */
export const STORAGE_KEYS = {
  THEME: 'weatherhub_theme',
  TEMPERATURE_UNIT: 'weatherhub_temp_unit',
  FAVORITE_CITIES: 'weatherhub_favorite_cities',
  LAST_SEARCHED: 'weatherhub_last_searched',
  USER_PREFERENCES: 'weatherhub_user_preferences',
} as const;

/**
 * Weather condition codes mapping to descriptions
 * Based on OpenWeatherMap condition codes
 */
export const WEATHER_CONDITIONS = {
  THUNDERSTORM: { range: [200, 299], icon: '⛈️', label: 'Thunderstorm' },
  DRIZZLE: { range: [300, 399], icon: '🌦️', label: 'Drizzle' },
  RAIN: { range: [500, 599], icon: '🌧️', label: 'Rain' },
  SNOW: { range: [600, 699], icon: '🌨️', label: 'Snow' },
  ATMOSPHERE: { range: [700, 799], icon: '🌫️', label: 'Mist' },
  CLEAR: { range: [800, 800], icon: '☀️', label: 'Clear' },
  CLOUDS: { range: [801, 899], icon: '☁️', label: 'Cloudy' },
} as const;

/**
 * Default user preferences
 */
export const DEFAULT_PREFERENCES = {
  theme: 'light' as const,
  temperatureUnit: 'celsius' as const,
  favoriteCities: [],
};

/**
 * Chart configuration
 */
export const CHART_CONFIG = {
  COLORS: {
    temperature: '#3b82f6',
    feelsLike: '#10b981',
    humidity: '#8b5cf6',
    precipitation: '#06b6d4',
  },
  HEIGHT: 300,
  MARGIN: { top: 5, right: 30, left: 20, bottom: 5 },
} as const;

/**
 * Map configuration for React Leaflet
 */
export const MAP_CONFIG = {
  DEFAULT_CENTER: [51.505, -0.09] as [number, number],
  DEFAULT_ZOOM: 10,
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  WEATHER_LAYERS: {
    temp: 'temp_new',
    precipitation: 'precipitation_new',
    clouds: 'clouds_new',
    wind: 'wind_new',
    pressure: 'pressure_new',
  },
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API key is missing. Please add your OpenWeatherMap API key to .env file.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  LOCATION_DENIED: 'Location access denied. Please enable location permissions or search for a city.',
  CITY_NOT_FOUND: 'City not found. Please try a different search term.',
  GENERIC_ERROR: 'An error occurred. Please try again later.',
  GEOLOCATION_UNSUPPORTED: 'Geolocation is not supported by your browser.',
} as const;
