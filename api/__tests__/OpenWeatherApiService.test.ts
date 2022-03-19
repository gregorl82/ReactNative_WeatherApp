import { Substitute, SubstituteOf } from '@fluffy-spoon/substitute';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { OpenWeatherApiService } from '../OpenWeatherApiService';

const mockAxios = new AxiosMockAdapter(axios);

describe('OpenWeatherApiService', () => {
  beforeEach(() => {
    mockAxios.reset();
  });
  it.todo('returns the correctly formatted data when getting current weather');
  it.todo(
    'throws an error if getting current weather and response status is not 200'
  );
  it.todo('returns only five days information when getting five day forecast');
  it.todo(
    'throws an error if getting five day forecast and response status is not 200'
  );
});
