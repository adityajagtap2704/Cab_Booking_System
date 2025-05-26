
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

const LocationSearch = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Mock locations for demo purposes
  const mockLocations = [
    { id: '1', name: 'Central Park', address: 'New York, NY 10022', lat: 40.7812, lng: -73.9665 },
    { id: '2', name: 'Times Square', address: 'New York, NY 10036', lat: 40.7580, lng: -73.9855 },
    { id: '3', name: 'Empire State Building', address: '350 5th Ave, New York, NY 10118', lat: 40.7484, lng: -73.9857 },
    { id: '4', name: 'Brooklyn Bridge', address: 'Brooklyn Bridge, New York, NY 10038', lat: 40.7061, lng: -73.9969 },
    { id: '5', name: 'Statue of Liberty', address: 'New York, NY 10004', lat: 40.6892, lng: -74.0445 },
    { id: '6', name: 'Grand Central Terminal', address: '89 E 42nd St, New York, NY 10017', lat: 40.7527, lng: -73.9772 },
    { id: '7', name: 'One World Trade Center', address: '285 Fulton St, New York, NY 10007', lat: 40.7127, lng: -74.0134 },
    { id: '8', name: 'Madison Square Garden', address: '4 Pennsylvania Plaza, New York, NY 10001', lat: 40.7505, lng: -73.9934 },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockLocations.filter(
          location => location.name.toLowerCase().includes(value.toLowerCase()) || 
                     location.address.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location.name);
    setResults([]);
    onSelect(location);
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
                key={location.id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => handleSelectLocation(location)}
              >
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{location.name}</p>
                    <p className="text-xs text-gray-500">{location.address}</p>
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
