/**
 * Custom hook for fetching air quality (pollution) data.
 * Wraps the getAirPollution API call with standard loading/error state.
 */

import { useState, useCallback } from 'react';
import { getAirPollution } from '../api';
import type { AirPollutionResponse, LoadingState } from '../types';

interface UseAirQualityReturn {
  airQuality: AirPollutionResponse | null;
  loading: LoadingState;
  error: string | null;
  fetchAirQuality: (lat: number, lon: number) => Promise<void>;
  clearError: () => void;
}

export const useAirQuality = (): UseAirQualityReturn => {
  const [airQuality, setAirQuality] = useState<AirPollutionResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchAirQuality = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading('loading');
      setError(null);
      const data = await getAirPollution(lat, lon);
      setAirQuality(data);
      setLoading('success');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch air quality data';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    airQuality,
    loading,
    error,
    fetchAirQuality,
    clearError,
  };
};
