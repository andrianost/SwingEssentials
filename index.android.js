import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import AppNavigation from './App'

export default class NativeNavigationExample extends Component {
  render() {
    return <AppNavigation/>
  }
}

AppRegistry.registerComponent('NativeNavigationExample', () => NativeNavigationExample);
