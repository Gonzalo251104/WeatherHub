/**
 * Home page - Main application page
 */

import React, { useEffect } from 'react';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { SearchBar, CurrentWeather, WeatherForecast, FavoriteCities, TemperatureChart, AirQualityCard } from '../components/weather';
import { useWeather, useForecast, useGeolocation, useAirQuality } from '../hooks';
import { CONFIG } from '../constants';

export const HomePage: React.FC = () => {
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearError: clearWeatherError,
  } = useWeather();

  const {
    forecast,
    loading: forecastLoading,
    error: forecastError,
    fetchForecastByCity,
    fetchForecastByCoords,
  } = useForecast();

  const { getCurrentLocation } = useGeolocation();
  const { airQuality, fetchAirQuality } = useAirQuality();

  // Load default city on mount
  useEffect(() => {
    fetchWeatherByCity(CONFIG.DEFAULT_CITY);
    fetchForecastByCity(CONFIG.DEFAULT_CITY);
  }, [fetchWeatherByCity, fetchForecastByCity]);

  // Fetch air quality when weather data becomes available
  useEffect(() => {
    if (weather) {
      fetchAirQuality(weather.coord.lat, weather.coord.lon);
    }
  }, [weather, fetchAirQuality]);

  const handleSearch = async (city: string) => {
    await Promise.all([fetchWeatherByCity(city), fetchForecastByCity(city)]);
  };

  const handleSearchByCoords = async (lat: number, lon: number) => {
    await Promise.all([fetchWeatherByCoords(lat, lon), fetchForecastByCoords(lat, lon)]);
  };

  const handleUseLocation = async () => {
    const position = await getCurrentLocation();
    if (position) {
      await Promise.all([
        fetchWeatherByCoords(position.latitude, position.longitude),
        fetchForecastByCoords(position.latitude, position.longitude),
      ]);
    }
  };

  const handleSelectFavorite = async (lat: number, lon: number) => {
    await Promise.all([fetchWeatherByCoords(lat, lon), fetchForecastByCoords(lat, lon)]);
  };

  const isLoading = weatherLoading === 'loading' || forecastLoading === 'loading';
  const hasError = weatherError || forecastError;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:px-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onSearchByCoords={handleSearchByCoords}
            onUseLocation={handleUseLocation}
            isLoading={isLoading}
          />
        </div>

        {/* Favorite Cities */}
        <div className="mb-8">
          <FavoriteCities onSelectCity={handleSelectFavorite} />
        </div>

        {/* Loading State */}
        {isLoading && !weather && (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="xl" message="Loading weather data..." />
          </div>
        )}

        {/* Error State */}
        {hasError && !weather && (
          <div className="flex justify-center items-center min-h-[400px]">
            <ErrorMessage
              message={weatherError || forecastError || 'An error occurred'}
              onRetry={() => {
                clearWeatherError();
                fetchWeatherByCity(CONFIG.DEFAULT_CITY);
                fetchForecastByCity(CONFIG.DEFAULT_CITY);
              }}
            />
          </div>
        )}

        {/* Weather Content */}
        {weather && (
          <div className="space-y-8">
            {/* Current Weather */}
            <CurrentWeather weather={weather} />

            {/* 24-Hour Temperature Trend */}
            {forecast && <TemperatureChart forecast={forecast} />}

            {/* Air Quality Index */}
            {airQuality && <AirQualityCard airQuality={airQuality} />}

            {/* 5-Day Forecast */}
            {forecast && <WeatherForecast forecast={forecast} />}

            {/* Additional Info Card */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About This Data
              </h3>
              <div className="text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  Weather data is provided by OpenWeatherMap API and is updated in real-time.
                </p>
                <p>
                  Search for any city worldwide or use your current location to get accurate
                  weather information.
                </p>
                <p className="text-sm">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
