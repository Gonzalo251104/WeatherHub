/**
 * Custom hook for fetching weather forecast data
 */

import { useState, useCallback } from 'react';
import { getForecastByCity, getForecastByCoords } from '../api';
import type { ForecastResponse, LoadingState } from '../types';

interface UseForecastReturn {
  forecast: ForecastResponse | null;
  loading: LoadingState;
  error: string | null;
  fetchForecastByCity: (city: string) => Promise<void>;
  fetchForecastByCoords: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

export const useForecast = (): UseForecastReturn => {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchForecastByCity = useCallback(async (city: string) => {
    try {
      setLoading('loading');
      setError(null);
      const data = await getForecastByCity(city);
      setForecast(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch forecast data';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const fetchForecastByCoords = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading('loading');
      setError(null);
      const data = await getForecastByCoords(lat, lon);
      setForecast(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch forecast data';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    forecast,
    loading,
    error,
    fetchForecastByCity,
    fetchForecastByCoords,
    clearError,
  };
};
