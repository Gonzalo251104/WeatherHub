/**
 * Weather API service functions
 */

import { apiClient } from './client';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  GeocodingResponse,
  AirPollutionResponse,
} from '../types';

/**
 * Fetch current weather data by city name
 */
export const getCurrentWeatherByCity = async (city: string): Promise<CurrentWeatherResponse> => {
  const response = await apiClient.get<CurrentWeatherResponse>('/weather', {
    params: { q: city },
  });
  return response.data;
};

/**
 * Fetch current weather data by coordinates
 */
export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> => {
  const response = await apiClient.get<CurrentWeatherResponse>('/weather', {
    params: { lat, lon },
  });
  return response.data;
};

/**
 * Fetch 5-day weather forecast by city name
 */
export const getForecastByCity = async (city: string): Promise<ForecastResponse> => {
  const response = await apiClient.get<ForecastResponse>('/forecast', {
    params: { q: city },
  });
  return response.data;
};

/**
 * Fetch 5-day weather forecast by coordinates
 */
export const getForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastResponse> => {
  const response = await apiClient.get<ForecastResponse>('/forecast', {
    params: { lat, lon },
  });
  return response.data;
};

/**
 * Search for cities by name (geocoding)
 */
export const searchCities = async (query: string, limit: number = 5): Promise<GeocodingResponse[]> => {
  const response = await apiClient.get<GeocodingResponse[]>(
    'https://api.openweathermap.org/geo/1.0/direct',
    {
      params: {
        q: query,
        limit,
        appid: apiClient.defaults.params.appid,
      },
    }
  );
  return response.data;
};

/**
 * Reverse geocoding - get location name from coordinates
 */
export const reverseGeocode = async (lat: number, lon: number): Promise<GeocodingResponse[]> => {
  const response = await apiClient.get<GeocodingResponse[]>(
    'https://api.openweathermap.org/geo/1.0/reverse',
    {
      params: {
        lat,
        lon,
        limit: 1,
        appid: apiClient.defaults.params.appid,
      },
    }
  );
  return response.data;
};

/**
 * Fetch air pollution data by coordinates
 */
export const getAirPollution = async (lat: number, lon: number): Promise<AirPollutionResponse> => {
  const response = await apiClient.get<AirPollutionResponse>('/air_pollution', {
    params: { lat, lon },
  });
  return response.data;
};

/**
 * Get weather data for multiple cities at once
 */
export const getMultipleCitiesWeather = async (
  cities: Array<{ lat: number; lon: number }>
): Promise<CurrentWeatherResponse[]> => {
  const promises = cities.map((city) => getCurrentWeatherByCoords(city.lat, city.lon));
  return Promise.all(promises);
};
