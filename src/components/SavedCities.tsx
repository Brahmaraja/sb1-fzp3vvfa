import React from 'react';
import { SavedCity } from '../types/weather';

interface SavedCitiesProps {
  cities: SavedCity[];
  onCitySelect: (city: string) => void;
  onRemoveCity: (city: SavedCity) => void;
}

export const SavedCities: React.FC<SavedCitiesProps> = ({
  cities,
  onCitySelect,
  onRemoveCity,
}) => {
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Saved Cities</h3>
      <div className="space-y-2">
        {cities.map((city) => (
          <div
            key={`${city.name}-${city.country}`}
            className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
          >
            <button
              onClick={() => onCitySelect(city.name)}
              className="flex-1 text-left hover:text-blue-600"
            >
              {city.name}, {city.country}
            </button>
            <button
              onClick={() => onRemoveCity(city)}
              className="ml-2 text-red-500 hover:text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};