/**
 * Footer component
 */

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-4 py-6 md:px-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center text-sm text-slate-500 dark:text-slate-400">
        <p className="mb-2">
          Built with React, TypeScript, and Tailwind CSS
        </p>
        <p>
          Data provided by{' '}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 dark:text-slate-50 hover:underline font-medium transition-colors"
          >
            OpenWeatherMap
          </a>
        </p>
        <p className="mt-2">&copy; {currentYear} WeatherHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
