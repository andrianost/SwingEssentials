import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, Alert } from 'react-native';
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
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./img/ic_navigate_next_2x.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
      headerLeft: (
        <Button
          icon={{name: 'dehaze', color: 'black', size: 40}}
          buttonStyle={{height: 50, width: 80, backgroundColor: 'transparent'}}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
      <View style={styles.container}>
        <Button
          raised
          title="Redeem a Lesson"
          buttonStyle={styles.CircleShapeView}
          onPress={() => this.props.navigation.navigate('RedeemLessonsScreen')}
        />
      </View>

      <View style={styles.container}>
        <Button
          raised
          title="Order a Lesson"
          buttonStyle={styles.CircleShapeView}
          onPress={() => this.props.navigation.navigate('OrderLessonsScreen')}
        />
      </View>
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
  },
  CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4'
  },
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
