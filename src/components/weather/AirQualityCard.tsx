/**
 * Air Quality Index (AQI) card component.
 * Displays the current air quality with a visual gradient bar
 * and breakdown of key pollutant concentrations.
 */

import React from 'react';
import { Card } from '../common';
import type { AirPollutionResponse } from '../../types';
import { getAQIDescription } from '../../utils';

interface AirQualityCardProps {
  airQuality: AirPollutionResponse;
}

/** AQI levels mapped to gradient positions (1-5 scale) */
const AQI_GRADIENT_POSITION: Record<number, number> = {
  1: 10,
  2: 30,
  3: 50,
  4: 70,
  5: 90,
};

/** Pollutant labels with units for display */
const POLLUTANT_INFO: Array<{
  key: keyof AirPollutionResponse['list'][0]['components'];
  label: string;
  unit: string;
}> = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'μg/m³' },
  { key: 'pm10', label: 'PM10', unit: 'μg/m³' },
  { key: 'o3', label: 'O₃', unit: 'μg/m³' },
  { key: 'no2', label: 'NO₂', unit: 'μg/m³' },
  { key: 'so2', label: 'SO₂', unit: 'μg/m³' },
  { key: 'co', label: 'CO', unit: 'μg/m³' },
];

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality }) => {
  const data = airQuality.list[0];
  if (!data) return null;

  const { aqi } = data.main;
  const { label, color } = getAQIDescription(aqi);
  const gradientPos = AQI_GRADIENT_POSITION[aqi] || 50;

  return (
    <Card className="animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Air Quality Index
      </h3>

      {/* AQI Badge and Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`text-4xl font-bold ${color}`}>{aqi}</div>
            <div>
              <div className={`text-xl font-semibold ${color}`}>{label}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Air Quality Index
              </div>
            </div>
          </div>
        </div>

        {/* Gradient bar with indicator */}
        <div className="relative h-3 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #7c3aed)',
            }}
          />
          {/* Position indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-800 dark:border-white shadow-md transition-all duration-500"
            style={{ left: `${gradientPos}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Good</span>
          <span>Fair</span>
          <span>Moderate</span>
          <span>Poor</span>
          <span>Very Poor</span>
        </div>
      </div>

      {/* Pollutant Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {POLLUTANT_INFO.map(({ key, label: pollutantLabel, unit }) => (
          <div
            key={key}
            className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {pollutantLabel}
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {data.components[key].toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{unit}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
