/**
 * Header component with theme toggle, temperature unit toggle, and app title
 */

import React from 'react';
import { useTheme, useTemperatureUnit } from '../../context';
import { Button } from '../common';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">🌤️</div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-blue-400 bg-clip-text text-transparent">
            WeatherHub
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Temperature Unit Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleUnit}
            aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
            className="rounded-full px-3 py-1.5 text-sm font-semibold"
          >
            {unit === 'celsius' ? '°C' : '°F'}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="md"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2"
          >
            {theme === 'light' ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
