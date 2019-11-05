import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import UserRatingsScreen from '../screens/UserRatingsScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    MovieDetails: MovieDetailsScreen,
  },
  config
);

const globalTabBarOptions = {
  //other properties
  // pressColor: 'gray',//for click (ripple) effect color
  style: {
    // backgroundColor: '#282828',
    // borderColor: '#282828',
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
  tabBarLabel: 'Rechercher',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
  tabBarOptions: globalTabBarOptions,
};

LinksStack.path = '';

const UserRatingsStack = createStackNavigator(
  {
    Settings: UserRatingsScreen,
  },
  config
);

UserRatingsStack.navigationOptions = {
  tabBarLabel: 'Mes notes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}       
      name={
      Platform.OS === 'ios'
        ? `ios-journal` // ${focused ? '' : '-outline'}
        : 'md-journal'
      } />
  ),
  tabBarOptions: globalTabBarOptions,
};

UserRatingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  UserRatingsStack,
  LinksStack,
});

tabNavigator.path = '';

export default tabNavigator;
