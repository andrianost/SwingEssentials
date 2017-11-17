import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { DrawerNavigator } from 'react-navigation';
import YourLessonsScreen from './YourLessonsScreen';
import RedeemLessonsScreen from './RedeemLessonsScreen';
import OrderLessonsScreen from './OrderLessonsScreen';
import AboutScreen from './AboutScreen';
import HelpScreen from './HelpScreen';
import SettingsScreen from './SettingsScreen';


class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Swing Essentials',
      headerLeft: (
        <Button
          icon={{name: 'dehaze', color: 'black', size: 40}}
          buttonStyle={{height: 50, width: 80, backgroundColor: 'transparent'}}
          onPress={() => this.props.navigation.navigate('DrawerOpen')} // This does not work
        />
      ),
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
        <Text>Home screen!</Text>
        <Text>Chat with {params.user}</Text>
        <Button
          title="Go to the menu"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

//Nav
const DrawerNav = DrawerNavigator({
  Home: {
    screen: HomeScreen,
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
    screen: SettingsScreen,
  },
});

export default DrawerNav

AppRegistry.registerComponent('SwingEssentials', () => DrawerNav);
