import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'

const AppNavigation = StackNavigator({
  First: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login Screen',
    }
  },
  Second: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home Screen',
    }
  }
})

export default AppNavigation

AppRegistry.registerComponent('SwingEssentials', () => AppNavigation);
