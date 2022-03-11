import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { CurrentWeatherApiData, CurrentWeatherData } from '../apiTypes';
import { API_KEY } from '../config';
import { getCurrentWeather } from '../getCurrentWeather';

const mockAxios = new AxiosMockAdapter(axios);

describe('Getting current weather data from API', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('throws an error if a non 200 error status is returned', async () => {
    expect.assertions(1);

    mockAxios
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?lat=55.9533&lon=-3.1883&appid=${API_KEY}`
      )
      .reply(404, {});

    try {
      await getCurrentWeather();
    } catch (error) {
      const expectedError = new Error('Request failed with status code 404');
      expect(error).toStrictEqual(expectedError);
    }
  });

  it('returns the API response in the expected format', async () => {
    const mockWeatherResponse = {
      name: 'Glasgow, GB',
      weather: [{ main: 'Cloudy with showers.' }],
      main: {
        temp: 285,
        feels_like: 283,
        temp_max: 287,
        temp_min: 282,
      },
      wind: { speed: 4 },
      visibility: 10_000,
    } as CurrentWeatherApiData;

    mockAxios
      .onGet(
        `https://api.openweathermap.org/data/2.5/weather?lat=55.9533&lon=-3.1883&appid=${API_KEY}`
      )
      .reply(200, mockWeatherResponse);

    const expectedResult = {
      location: 'Glasgow, GB',
      currentTemperature: 12,
      feelsLikeTemperature: 10,
      maximumTemperature: 14,
      minimumTemperature: 9,
      weatherDescription: 'Cloudy with showers.',
      windSpeed: 4,
      visibility: 10_000,
    } as CurrentWeatherData;

    const result = await getCurrentWeather();

    expect(result).toStrictEqual(expectedResult);
  });
});
