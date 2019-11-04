import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthScreen from '../screens/AuthScreen'
import SettingsScreen from '../screens/SettingsScreen'

import MainTabNavigator from './MainTabNavigator';


const MainDrawerNavigator = createDrawerNavigator({
  Accueil:  MainTabNavigator,
  Paramètres: SettingsScreen,
}, {
  initialRouteName: 'Accueil',
  contentOptions: {
    activeTintColor: '#2557b7',
  }
});

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainDrawerNavigator,
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
  }, {
    initialRouteName: 'AuthLoading',
  })
);
