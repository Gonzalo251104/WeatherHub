/**
 * Temperature trend chart component.
 * Displays a line chart of temperature and "feels like" temperature
 * for the next 24 hours using forecast data from OpenWeatherMap.
 */

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '../common';
import { useTheme, useTemperatureUnit } from '../../context';
import type { ForecastResponse } from '../../types';
import { CHART_CONFIG } from '../../constants';

interface TemperatureChartProps {
  forecast: ForecastResponse;
}

/**
 * Build chart data from forecast entries.
 * Takes the first 8 entries (24h at 3h intervals) and
 * formats them for Recharts consumption.
 */
const buildChartData = (
  forecast: ForecastResponse,
  unit: 'celsius' | 'fahrenheit'
) => {
  return forecast.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    const timeLabel = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });

    // formatTemperature returns a string like "24°C", extract numeric value
    const tempValue =
      unit === 'fahrenheit'
        ? parseFloat(((item.main.temp * 9) / 5 + 32).toFixed(0))
        : parseFloat(item.main.temp.toFixed(0));

    const feelsValue =
      unit === 'fahrenheit'
        ? parseFloat(((item.main.feels_like * 9) / 5 + 32).toFixed(0))
        : parseFloat(item.main.feels_like.toFixed(0));

    return {
      time: timeLabel,
      temperature: tempValue,
      feelsLike: feelsValue,
      humidity: item.main.humidity,
    };
  });
};

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecast }) => {
  const { theme } = useTheme();
  const { unit } = useTemperatureUnit();

  const data = buildChartData(forecast, unit);
  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';
  const isDark = theme === 'dark';

  // Theme-aware colors
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <Card className="animate-slide-up">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        24-Hour Temperature Trend
      </h3>

      <div style={{ width: '100%', height: CHART_CONFIG.HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={CHART_CONFIG.MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="time"
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
            />
            <YAxis
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value: number) => `${value}${unitSymbol}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '0.5rem',
                color: isDark ? '#f3f4f6' : '#1f2937',
              }}
              formatter={((value: number, name: string) => [
                `${value}${unitSymbol}`,
                name === 'temperature' ? 'Temperature' : 'Feels Like',
              ]) as never}
              labelStyle={{ color: textColor }}
            />
            <Legend
              wrapperStyle={{ color: textColor }}
              formatter={(value: string) =>
                value === 'temperature' ? 'Temperature' : 'Feels Like'
              }
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke={CHART_CONFIG.COLORS.temperature}
              strokeWidth={3}
              dot={{ fill: CHART_CONFIG.COLORS.temperature, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="feelsLike"
              stroke={CHART_CONFIG.COLORS.feelsLike}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: CHART_CONFIG.COLORS.feelsLike, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
