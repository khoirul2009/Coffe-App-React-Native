import React, {useEffect} from 'react';
import HomeScreen from './src/pages/HomeScreen';
import DetailScreen from './src/pages/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/pages/type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from './src/pages/CartScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useColorPrimary} from './src/constants/theme';
import {Platform, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HistoryScreen from './src/pages/HistoryScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import SplashScreen from 'react-native-splash-screen';
import OrderScreen from './src/pages/OrderScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import DiscoverScreen from './src/pages/DiscoverScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTabs = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  const textColor = isDarkMode ? '#fff' : '#000';
  const colorPrimary = useColorPrimary(isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Carts') {
            iconName = 'shopping-cart';
          } else if (route.name === 'History') {
            iconName = 'clipboard-list';
          } else if (route.name === 'Profile') {
            iconName = 'user-circle';
          }

          return (
            <FontAwesome5 name={iconName} size={size} color={colorPrimary} />
          );
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        tabBarLabelStyle: {
          color: textColor,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Carts" component={CartScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
