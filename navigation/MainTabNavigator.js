import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    // MovieDetails: MovieDetailsScreen,
  },
  config
);

const globalTabBarOptions = {
  //other properties
  pressColor: 'gray',//for click (ripple) effect color
  style: {
    backgroundColor: '#282828',
    borderColor: '#282828',
  }
}

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home` //${focused ? '' : '-outline'}
          : 'md-home'
      }
    />
  ),
  tabBarOptions: globalTabBarOptions,
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    MovieDetails: MovieDetailsScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
  tabBarOptions: globalTabBarOptions,
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}       
      name={
      Platform.OS === 'ios'
        ? `ios-notifications${focused ? '' : '-outline'}`
        : 'md-notifications'
      } />
  ),
  tabBarOptions: globalTabBarOptions,
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
