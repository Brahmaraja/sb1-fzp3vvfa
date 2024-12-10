import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};