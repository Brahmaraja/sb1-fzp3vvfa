import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SavedCities } from './components/SavedCities';
import { UnitToggle } from './components/UnitToggle';
import { getWeatherData } from './services/weatherApi';
import { getSavedCities, saveCity, removeCity } from './utils/storage';
import { WeatherData, SavedCity } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [savedCities, setSavedCities] = useState<SavedCity[]>(getSavedCities());

  const handleSearch = async (city: string) => {
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (error) {
      toast.error('Failed to fetch weather data. Please try again.');
    }
  };

  const handleToggleSave = () => {
    if (!weather) return;

    const city: SavedCity = {
      name: weather.location.name,
      country: weather.location.country,
    };

    const isSaved = savedCities.some(
      (c) => c.name === city.name && c.country === city.country
    );

    if (isSaved) {
      removeCity(city);
      setSavedCities(getSavedCities());
      toast.success('City removed from favorites');
    } else {
      saveCity(city);
      setSavedCities(getSavedCities());
      toast.success('City added to favorites');
    }
  };

  const handleRemoveCity = (city: SavedCity) => {
    removeCity(city);
    setSavedCities(getSavedCities());
    toast.success('City removed from favorites');
  };

  const isCitySaved = (weather: WeatherData) =>
    savedCities.some(
      (city) =>
        city.name === weather.location.name &&
        city.country === weather.location.country
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Weather Dashboard
        </h1>

        <div className="flex flex-col items-center space-y-4">
          <SearchBar onSearch={handleSearch} />
          <UnitToggle
            isCelsius={isCelsius}
            onToggle={() => setIsCelsius(!isCelsius)}
          />
        </div>

        {weather && (
          <WeatherCard
            weather={weather}
            isCelsius={isCelsius}
            isSaved={isCitySaved(weather)}
            onToggleSave={handleToggleSave}
          />
        )}

        <SavedCities
          cities={savedCities}
          onCitySelect={handleSearch}
          onRemoveCity={handleRemoveCity}
        />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;