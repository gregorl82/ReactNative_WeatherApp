import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from '../screens/Settings';
import { FiveDayForecastScreen } from '../screens/FiveDayForecast';
import { CurrentWeatherScreen } from '../screens/CurrentWeather';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName: IoniconName;
            if (route.name === 'Current') {
              iconName = focused
                ? 'ios-partly-sunny'
                : 'ios-partly-sunny-outline';
            } else if (route.name === '5-day') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            } else {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'lightgray',
          tabBarIconStyle: { fontSize: 24 },
        })}
      >
        <Tab.Screen
          name="Current"
          component={CurrentWeatherScreen}
          options={{ title: 'Current', headerTitle: 'Current weather' }}
        />
        <Tab.Screen
          name="5-day"
          component={FiveDayForecastScreen}
          options={{ title: '5-day', headerTitle: '5-day forecast' }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings', headerTitle: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
