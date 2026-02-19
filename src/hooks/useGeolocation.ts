/**
 * Custom hook for geolocation functionality
 */

import { useState, useCallback } from 'react';
import { getCurrentPosition } from '../api';
import type { GeolocationResult, LoadingState } from '../types';

interface UseGeolocationReturn {
  position: GeolocationResult | null;
  loading: LoadingState;
  error: string | null;
  getCurrentLocation: () => Promise<GeolocationResult | null>;
  clearError: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [position, setPosition] = useState<GeolocationResult | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<GeolocationResult | null> => {
    try {
      setLoading('loading');
      setError(null);
      const pos = await getCurrentPosition();
      setPosition(pos);
      setLoading('success');
      return pos;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      setLoading('error');
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    position,
    loading,
    error,
    getCurrentLocation,
    clearError,
  };
};
