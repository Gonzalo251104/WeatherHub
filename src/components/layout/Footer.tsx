/**
 * Footer component
 */

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect mt-auto px-4 py-6 md:px-8">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-2">
          Built with React, TypeScript, and Tailwind CSS
        </p>
        <p>
          Data provided by{' '}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
          >
            OpenWeatherMap
          </a>
        </p>
        <p className="mt-2">&copy; {currentYear} WeatherHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
