/**
 * Custom hook for debouncing a value.
 * Useful for delaying API calls until the user stops typing.
 *
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value
 */

import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
