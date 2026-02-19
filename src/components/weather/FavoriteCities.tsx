/**
 * Favorite cities list component
 */

import React from 'react';
import { Card, Button } from '../common';
import { useFavorites } from '../../context';

interface FavoriteCitiesProps {
  onSelectCity: (lat: number, lon: number, name: string) => void;
}

export const FavoriteCities: React.FC<FavoriteCitiesProps> = ({ onSelectCity }) => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <Card className="animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Favorite Cities
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {favorites.map((city) => (
          <div
            key={city.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <button
              onClick={() => onSelectCity(city.lat, city.lon, city.name)}
              className="flex-1 text-left"
            >
              <div className="font-semibold text-gray-900 dark:text-white">
                {city.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{city.country}</div>
            </button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFavorite(city.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1"
              aria-label={`Remove ${city.name} from favorites`}
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
