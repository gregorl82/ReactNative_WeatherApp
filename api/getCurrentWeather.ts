import axios from 'axios';
import { CurrentWeatherApiData, CurrentWeatherData } from './apiTypes';

import { API_KEY } from './config';
import { convertKelvinToCelcius } from './util';

export const getCurrentWeather = async (
  lat: number = 55.9533,
  lon: number = 3.1883
): Promise<CurrentWeatherData> => {
  const { status, data } = await axios.get<CurrentWeatherApiData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (status !== 200) {
    throw new Error('Unable to get current weather data');
  }

  return {
    location: data.name,
    weatherDescription: data.weather[0].main,
    currentTemperature: convertKelvinToCelcius(data.main.temp),
    maximumTemperature: convertKelvinToCelcius(data.main.temp_max),
    minimumTemperature: convertKelvinToCelcius(data.main.temp_min),
    feelsLikeTemperature: convertKelvinToCelcius(data.main.feels_like),
    windSpeed: Math.round(Number(data.wind.speed)),
    visibility: data.visibility,
  };
};
