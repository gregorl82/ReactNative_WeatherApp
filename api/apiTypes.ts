export type Coordinates = { lat: number; lon: number };

export interface CurrentWeatherApiData {
  coord: Coordinates;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherData {
  currentTemperature: number;
  feelsLikeTemperature: number;
  minimumTemperature: number;
  maximumTemperature: number;
  weatherDescription: string;
  windSpeed: number;
  visibility: number;
  date?: string;
}

export interface CurrentWeatherData extends WeatherData {
  location: string;
}
///
export interface FiveDayForecastApiData {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  rain?: Rain;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Sys {
  pod: string;
}

export interface Rain {
  '3h': number;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface FiveDayForecastData {
  location: string;
  forecastData: WeatherData[];
}

export interface AppSettings {
  isMetric: boolean;
  storedLocations: { name: string; country: string; coords: Coordinates }[];
}

export enum UnitOfMeasure {
  Metric = 'metric',
  Imperial = 'imperial',
}
