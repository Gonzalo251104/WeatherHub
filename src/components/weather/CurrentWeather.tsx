/**
 * Current weather display component
 */

import React from 'react';
import { Card, Button } from '../common';
import { useFavorites } from '../../context';
import type { CurrentWeatherResponse } from '../../types';
import {
  formatTemperature,
  formatTime,
  formatDate,
  getWeatherIconUrl,
  capitalizeWeatherDescription,
  getWindDirection,
  formatWindSpeed,
} from '../../utils';

interface CurrentWeatherProps {
  weather: CurrentWeatherResponse;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(weather.coord.lat, weather.coord.lon);

  const handleToggleFavorite = () => {
    if (favorite) {
      const favCity = favorites
        .find(
          (fav) =>
            Math.abs(fav.lat - weather.coord.lat) < 0.01 &&
            Math.abs(fav.lon - weather.coord.lon) < 0.01
        );
      if (favCity) {
        removeFavorite(favCity.id);
      }
    } else {
      addFavorite({
        name: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      });
    }
  };

  const mainWeather = weather.weather[0];

  return (
    <Card className="animate-fade-in">
      {/* Location and Favorite Button */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {formatDate(weather.dt, 'long')} • {formatTime(weather.dt)}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleFavorite}
          className="rounded-full p-2"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-6 h-6 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </Button>
      </div>

      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIconUrl(mainWeather.icon, '4x')}
            alt={mainWeather.description}
            className="weather-icon-large"
          />
          <div>
            <div className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">
              {formatTemperature(weather.main.temp)}
            </div>
            <div className="text-xl text-gray-600 dark:text-gray-400 mt-2">
              Feels like {formatTemperature(weather.main.feels_like)}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {capitalizeWeatherDescription(mainWeather.description)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            H: {formatTemperature(weather.main.temp_max)} • L:{' '}
            {formatTemperature(weather.main.temp_min)}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WeatherDetail
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          }
          label="Humidity"
          value={`${weather.main.humidity}%`}
        />

        <WeatherDetail
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          }
          label="Wind"
          value={`${formatWindSpeed(weather.wind.speed)} ${getWindDirection(weather.wind.deg)}`}
        />

        <WeatherDetail
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0h2a2 2 0 012-2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
        />

        <WeatherDetail
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
        />
      </div>

      {/* Sunrise and Sunset */}
      <div className="flex justify-around mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌅</span>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sunrise</div>
            <div className="text-lg font-semibold">{formatTime(weather.sys.sunrise)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌇</span>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sunset</div>
            <div className="text-lg font-semibold">{formatTime(weather.sys.sunset)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="text-gray-600 dark:text-gray-400 mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
};
