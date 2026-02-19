/**
 * Favorites context for managing favorite cities
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FavoriteCity } from '../types';
import { STORAGE_KEYS, CONFIG } from '../constants';
import { getStorageItem, setStorageItem } from '../utils';

interface FavoritesContextType {
  favorites: FavoriteCity[];
  addFavorite: (city: Omit<FavoriteCity, 'id' | 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => {
    return getStorageItem<FavoriteCity[]>(STORAGE_KEYS.FAVORITE_CITIES, []);
  });

  // Persist favorites to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.FAVORITE_CITIES, favorites);
  }, [favorites]);

  const addFavorite = (city: Omit<FavoriteCity, 'id' | 'addedAt'>) => {
    // Check if already in favorites
    const exists = favorites.some(
      (fav) => Math.abs(fav.lat - city.lat) < 0.01 && Math.abs(fav.lon - city.lon) < 0.01
    );

    if (exists) {
      console.warn('City already in favorites');
      return;
    }

    // Check maximum limit
    if (favorites.length >= CONFIG.MAX_FAVORITE_CITIES) {
      console.warn(`Maximum ${CONFIG.MAX_FAVORITE_CITIES} favorites allowed`);
      return;
    }

    const newFavorite: FavoriteCity = {
      ...city,
      id: `${city.lat}-${city.lon}-${Date.now()}`,
      addedAt: Date.now(),
    };

    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (lat: number, lon: number): boolean => {
    return favorites.some(
      (fav) => Math.abs(fav.lat - lat) < 0.01 && Math.abs(fav.lon - lon) < 0.01
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Hook to use favorites context
 */
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
