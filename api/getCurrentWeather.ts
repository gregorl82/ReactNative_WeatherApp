import axios from 'axios';
import {
  Coordinates,
  CurrentWeatherApiData,
  CurrentWeatherData,
  UnitOfMeasure,
} from './apiTypes';

import { API_KEY } from './config';

export const getCurrentWeather = async (
  coordinates: Coordinates = { lat: 55.8642, lon: -4.2518 },
  units: UnitOfMeasure = UnitOfMeasure.Metric
): Promise<CurrentWeatherData> => {
  const { status, data } = await axios.get<CurrentWeatherApiData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=${units}`
  );

  if (status !== 200) {
    throw new Error('Unable to get current weather data');
  }

  return {
    location: `${data.name}, ${data.sys.country}`,
    weatherDescription: data.weather[0].main,
    currentTemperature: Math.round(data.main.temp),
    maximumTemperature: Math.round(data.main.temp_max),
    minimumTemperature: Math.round(data.main.temp_min),
    feelsLikeTemperature: Math.round(data.main.feels_like),
    windSpeed: Math.round(Number(data.wind.speed)),
    visibility: data.visibility,
  };
};
