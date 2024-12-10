import { SavedCity } from '../types/weather';

const SAVED_CITIES_KEY = 'savedCities';

export const getSavedCities = (): SavedCity[] => {
  const saved = localStorage.getItem(SAVED_CITIES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveCity = (city: SavedCity) => {
  const cities = getSavedCities();
  if (!cities.some(c => c.name === city.name && c.country === city.country)) {
    cities.push(city);
    localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(cities));
  }
};

export const removeCity = (city: SavedCity) => {
  const cities = getSavedCities();
  const filtered = cities.filter(
    c => c.name !== city.name || c.country !== city.country
  );
  localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(filtered));
};