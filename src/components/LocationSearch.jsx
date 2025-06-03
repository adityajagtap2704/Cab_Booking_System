import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Debounce helper
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

const API_KEY = 'pk.0a142ff9e155d618fd04464e73c34a0e';

const LocationSearch = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocations = async (searchText) => {
    if (searchText.length < 3) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
          searchText
        )}&format=json`
      );
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('LocationIQ API error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useDebounce((value) => {
    setIsLoading(true);
    fetchLocations(value);
  }, 400);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsLoading(true);
    debouncedFetch(value);
  };

  const handleSelectLocation = (location) => {
    setQuery(location.display_name);
    setResults([]);
    onSelect({
      id: location.place_id || location.osm_id,
      name: location.display_name,
      address: location.display_name,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
    });
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-10"
          autoComplete="off"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {results.length > 0 && isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {results.map((location) => (
              <li
                key={location.place_id || location.osm_id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => handleSelectLocation(location)}
              >
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{location.display_name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default LocationSearch;
