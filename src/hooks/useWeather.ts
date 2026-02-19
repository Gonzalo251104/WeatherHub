/**
 * Custom hook for fetching current weather data
 */

import { useState, useCallback } from 'react';
import { getCurrentWeatherByCity, getCurrentWeatherByCoords } from '../api';
import type { CurrentWeatherResponse, LoadingState } from '../types';

interface UseWeatherReturn {
  weather: CurrentWeatherResponse | null;
  loading: LoadingState;
  error: string | null;
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    try {
      setLoading('loading');
      setError(null);
      const data = await getCurrentWeatherByCity(city);
      setWeather(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading('loading');
      setError(null);
      const data = await getCurrentWeatherByCoords(lat, lon);
      setWeather(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearError,
  };
};
