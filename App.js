import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, Image, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

class MyHomeScreen extends React.Component {
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
      <Image source={require('./img/ic_dehaze_2x.png')} />
      <Button
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        title="Go to menu"
      />
      </View>
    );
  }
}

class YourLessons extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Your Lessons',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        title="Go back home"
        onPress={() => this.props.navigation.goBack()}
      />
    );
  }
}

class RedeemLessons extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Redeem Lessons',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

class OrderLessons extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Order Lessons',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

class Help extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Help',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

class About extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

class Settings extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    paddingTop: 20
  },
});

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  YourLessons: {
    screen: YourLessons,
  },
  RedeemLessons: {
    screen: RedeemLessons,
  },
  OrderLessons: {
    screen: OrderLessons,
  },
  Help: {
    screen: Help,
  },
  About: {
    screen: About,
  },
  Settings: {
    screen: Settings,
  },
});

export default MyApp

//Stack Nav
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

AppRegistry.registerComponent('SwingEssentials', () => MyApp);
