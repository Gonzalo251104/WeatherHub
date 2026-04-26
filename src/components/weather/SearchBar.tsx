/**
 * Search bar component with city autocomplete.
 * Uses the geocoding API to suggest cities as the user types,
 * with debounced input to minimize API calls.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from '../common';
import { useDebounce } from '../../hooks';
import { searchCities } from '../../api';
import type { GeocodingResponse } from '../../types';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onSearchByCoords: (lat: number, lon: number) => void;
  onUseLocation: () => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSearchByCoords,
  onUseLocation,
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResponse[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch city suggestions when debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await searchCities(debouncedQuery.trim());
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: GeocodingResponse) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
    onSearchByCoords(suggestion.lat, suggestion.lon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveIndex(-1);
        break;
    }
  };

  /**
   * Format the display label for a suggestion.
   * Shows "City, State, Country" when state is available.
   */
  const formatSuggestionLabel = (s: GeocodingResponse): string => {
    const parts = [s.name];
    if (s.state) parts.push(s.state);
    parts.push(s.country);
    return parts.join(', ');
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              disabled={isLoading}
              autoComplete="off"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden"
                role="listbox"
                aria-label="City suggestions"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.lat}-${suggestion.lon}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 ${
                      index === activeIndex
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatSuggestionLabel(suggestion)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={!query.trim() || isLoading}
              isLoading={isLoading}
              className="flex-1 sm:flex-none"
            >
              Search
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onUseLocation}
              disabled={isLoading}
              aria-label="Use my location"
              className="flex-1 sm:flex-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
