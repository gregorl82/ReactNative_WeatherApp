import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CurrentWeatherData } from '../api/apiTypes';
import { getCurrentWeather } from '../api/getCurrentWeather';

export const CurrentWeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();

  useEffect(() => {
    const getWeather = async () => {
      try {
        const currentWeatherData = await getCurrentWeather();
        setCurrentWeather(currentWeatherData);
      } catch (error) {
        console.log({ error });
      }
    };
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {currentWeather ? (
        <>
          <Text>{currentWeather.location}</Text>
          <Text>{currentWeather.weatherDescription}</Text>
          <Text>
            Current temp: {currentWeather.currentTemperature.toString()}°C
          </Text>
          <Text>
            Max temp: {currentWeather.maximumTemperature.toString()}°C
          </Text>
          <Text>
            Min temp: {currentWeather.minimumTemperature.toString()}°C
          </Text>
        </>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
