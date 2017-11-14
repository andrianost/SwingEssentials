import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-elements'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import YourLessonsScreen from './YourLessonsScreen';
import RedeemLessonsScreen from './RedeemLessonsScreen';
import OrderLessonsScreen from './OrderLessonsScreen';
import AboutScreen from './AboutScreen';
import HelpScreen from './HelpScreen';
import SettingsScreen from './SettingsScreen';

//Launching drawer menu
class Menu extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/chats-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
      <Button
        buttonStyle={{height: 50, width: 80, backgroundColor: 'white'}}
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        icon={{name: 'dehaze', color: 'black', size: 50}}
      />
      </View>
    );
  }
}

//Styling
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    paddingTop: 30
  },
});

//Drawer Nav
const MyApp = DrawerNavigator({
  Home: {
    screen: Menu,
  },
  YourLessonsScreen: {
    screen: YourLessonsScreen,
  },
  RedeemLessonsScreen: {
    screen: RedeemLessonsScreen,
  },
  OrderLessonsScreen: {
    screen: OrderLessonsScreen,
  },
  HelpScreen: {
    screen: HelpScreen,
  },
  AboutScreen: {
    screen: AboutScreen,
  },
  SettingsScreen: {
    screen: LoginScreen,
  },
});

//Stack Nav
const AppNavigation = StackNavigator({
  First: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login Screen',
    }
  },
  Second: {
    screen: YourLessonsScreen,
    navigationOptions: {
      title: 'Your Lessons Screen',
    }
  }
  })

export default MyApp

AppRegistry.registerComponent('SwingEssentials', () => MyApp);
