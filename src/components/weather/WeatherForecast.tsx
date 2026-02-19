/**
 * Weather forecast component (5-day)
 */

import React from 'react';
import { Card } from '../common';
import type { ForecastResponse } from '../../types';
import {
  formatTemperature,
  formatDayOfWeek,
  getWeatherIconUrl,
  capitalizeWeatherDescription,
} from '../../utils';

interface WeatherForecastProps {
  forecast: ForecastResponse;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  // Group forecast by day (get one forecast per day at noon)
  const dailyForecasts = forecast.list.filter((item) => item.dt_txt.includes('12:00:00'));

  return (
    <Card className="animate-slide-up">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.slice(0, 5).map((item) => (
          <div
            key={item.dt}
            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {formatDayOfWeek(item.dt)}
            </div>

            <img
              src={getWeatherIconUrl(item.weather[0].icon, '2x')}
              alt={item.weather[0].description}
              className="weather-icon-small mb-2"
            />

            <div className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
              {capitalizeWeatherDescription(item.weather[0].description)}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatTemperature(item.main.temp_max)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {formatTemperature(item.main.temp_min)}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{item.main.humidity}%</span>
              </div>
              {item.pop > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span>{Math.round(item.pop * 100)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
