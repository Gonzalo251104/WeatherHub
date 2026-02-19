/**
 * Axios instance configuration for OpenWeatherMap API
 */

import axios, { type AxiosInstance, AxiosError } from 'axios';
import { CONFIG, ERROR_MESSAGES } from '../constants';

/**
 * Create axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  
  const client = axios.create({
    baseURL: CONFIG.OPENWEATHER_BASE_URL,
    timeout: 10000,
    params: {
      appid: CONFIG.OPENWEATHER_API_KEY,
      units: CONFIG.DEFAULT_UNITS,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Check if API key is configured
      if (!CONFIG.OPENWEATHER_API_KEY) {
        console.error(ERROR_MESSAGES.API_KEY_MISSING);
        return Promise.reject(new Error(ERROR_MESSAGES.API_KEY_MISSING));
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data as { message?: string };
        
        switch (status) {
          case 401:
            console.error('Invalid API key');
            break;
          case 404:
            console.error(ERROR_MESSAGES.CITY_NOT_FOUND);
            break;
          case 429:
            console.error('API rate limit exceeded');
            break;
          default:
            console.error(`API Error: ${data.message || error.message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error(ERROR_MESSAGES.NETWORK_ERROR);
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();
