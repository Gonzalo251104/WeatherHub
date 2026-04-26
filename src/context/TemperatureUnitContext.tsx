/**
 * Temperature unit context for managing Celsius/Fahrenheit preference.
 * Persists the user's choice to localStorage and provides
 * a toggle function for switching between units.
 */

import React, { createContext, useContext, useState } from 'react';
import type { TemperatureUnit } from '../types';
import { STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils';

interface TemperatureUnitContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  setUnit: (unit: TemperatureUnit) => void;
}

const TemperatureUnitContext = createContext<TemperatureUnitContextType | undefined>(undefined);

/**
 * Get initial temperature unit from localStorage or default to Celsius
 */
const getInitialUnit = (): TemperatureUnit => {
  return getStorageItem<TemperatureUnit>(STORAGE_KEYS.TEMPERATURE_UNIT, 'celsius');
};

export const TemperatureUnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnitState] = useState<TemperatureUnit>(getInitialUnit);

  const setUnit = (newUnit: TemperatureUnit) => {
    setUnitState(newUnit);
    setStorageItem(STORAGE_KEYS.TEMPERATURE_UNIT, newUnit);
  };

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit, setUnit }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
};

/**
 * Hook to access the temperature unit context.
 * Must be used within a TemperatureUnitProvider.
 */
export const useTemperatureUnit = (): TemperatureUnitContextType => {
  const context = useContext(TemperatureUnitContext);
  if (!context) {
    throw new Error('useTemperatureUnit must be used within TemperatureUnitProvider');
  }
  return context;
};
