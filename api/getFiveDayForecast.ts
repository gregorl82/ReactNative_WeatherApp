import axios from 'axios';
import {
  Coordinates,
  FiveDayForecastApiData,
  FiveDayForecastData,
  WeatherData,
} from './apiTypes';
import { API_KEY } from './config';
import { convertKelvinToCelcius } from './util';

export const getFiveDayForecast = async (
  coordinates: Coordinates = { lat: 55.8642, lon: -4.2518 }
): Promise<FiveDayForecastData> => {
  const { status, data } = await axios.get<FiveDayForecastApiData>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`
  );

  if (status !== 200) {
    throw new Error('Unable to get five day forecast data');
  }

  const location = `${data.city.name}, ${data.city.country}`;

  const forecastData: WeatherData[] = data.list.map((item) => {
    return {
      weatherDescription: item.weather[0].main,
      currentTemperature: convertKelvinToCelcius(item.main.temp),
      maximumTemperature: convertKelvinToCelcius(item.main.temp_max),
      minimumTemperature: convertKelvinToCelcius(item.main.temp_min),
      feelsLikeTemperature: convertKelvinToCelcius(item.main.feels_like),
      windSpeed: Math.round(Number(item.wind.speed)),
      visibility: item.visibility,
      date: item.dt_txt,
    };
  });

  return { location, forecastData };
};
