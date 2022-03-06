import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { API_KEY } from '../config';
import { getCurrentWeather } from '../getCurrentWeather';

const mockAxios = new AxiosMockAdapter(axios);

mockAxios
  .onGet(
    `https://api.openweathermap.org/data/2.5/weather?lat=55.9533&lon=-3.1883&appid=${API_KEY}`
  )
  .reply(404, {});

describe('Getting current weather data from API', () => {
  it('Throws an error if a non 200 error status is returned', async () => {
    expect.assertions(1);

    try {
      await getCurrentWeather();
    } catch (error) {
      const expectedError = new Error('Request failed with status code 404');
      expect(error).toStrictEqual(expectedError);
    }
  });
});
