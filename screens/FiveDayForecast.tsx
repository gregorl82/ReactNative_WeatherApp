import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FiveDayForecastData, WeatherData } from '../api/apiTypes';
import { getFiveDayForecast } from '../api/getFiveDayForecast';

const WeatherItem: React.FC<{ data: WeatherData }> = ({
  data,
}): JSX.Element => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{data.weatherDescription}</Text>
      <Text>Current temp: {data.currentTemperature.toString()}°C</Text>
      <Text>Max temp: {data.maximumTemperature.toString()}°C</Text>
      <Text>Min temp: {data.minimumTemperature.toString()}°C</Text>
      <Text>{data.date}</Text>
    </View>
  );
};

export const FiveDayForecastScreen = () => {
  const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecastData>();

  useEffect(() => {
    const getFiveDayForecastData = async () => {
      try {
        const data = await getFiveDayForecast();
        setFiveDayForecast(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFiveDayForecastData();
  }, []);

  return (
    <View>
      {fiveDayForecast
        ? fiveDayForecast.forecastData.map((item) => (
            <WeatherItem key={item.date} data={item} />
          ))
        : null}
    </View>
  );
};
