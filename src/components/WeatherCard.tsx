import React from 'react';
import { WeatherData } from '../types/weather';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface WeatherCardProps {
  weather: WeatherData;
  isCelsius: boolean;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  isCelsius,
  isSaved,
  onToggleSave,
}) => {
  const temperature = isCelsius ? weather.current.temp_c : weather.current.temp_f;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {weather.location.name}
          </h2>
          <p className="text-gray-600">{weather.location.country}</p>
        </div>
        <button
          onClick={onToggleSave}
          className="text-red-500 hover:text-red-600 text-xl"
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
          className="w-16 h-16"
        />
        <div className="ml-4">
          <p className="text-4xl font-bold text-gray-800">
            {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}
          </p>
          <p className="text-gray-600">{weather.current.condition.text}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-2 bg-gray-100 rounded">
          <p className="text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{weather.current.humidity}%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 rounded">
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">
            {Math.round(weather.current.wind_kph)} km/h
          </p>
        </div>
      </div>
    </div>
  );
};