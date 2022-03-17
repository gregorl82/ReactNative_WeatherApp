import axios from 'axios';
import {
  Coordinates,
  FiveDayForecastApiData,
  FiveDayForecastData,
  UnitOfMeasure,
  WeatherData,
} from './apiTypes';
import { API_KEY } from './config';

export const getFiveDayForecast = async (
  coordinates: Coordinates = { lat: 55.8642, lon: -4.2518 },
  units: UnitOfMeasure = UnitOfMeasure.Metric
): Promise<FiveDayForecastData> => {
  const { status, data } = await axios.get<FiveDayForecastApiData>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=${units}`
  );

  if (status !== 200) {
    throw new Error('Unable to get five day forecast data');
  }

  const location = `${data.city.name}, ${data.city.country}`;

  const forecastData: WeatherData[] = [];

  data.list.map((item) => {
    const date = new Date(item.dt * 1000);
    if (date.getHours() === 12)
      forecastData.push({
        weatherDescription: item.weather[0].main,
        currentTemperature: Math.round(item.main.temp),
        maximumTemperature: Math.round(item.main.temp_max),
        minimumTemperature: Math.round(item.main.temp_min),
        feelsLikeTemperature: Math.round(item.main.feels_like),
        windSpeed: Math.round(Number(item.wind.speed)),
        visibility: item.visibility,
        date: item.dt_txt,
      });
  });

  return { location, forecastData };
};
