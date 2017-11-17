import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Alert } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import YourLessonsScreen from './YourLessonsScreen';
import RedeemLessonsScreen from './RedeemLessonsScreen';
import OrderLessonsScreen from './OrderLessonsScreen';
import AboutScreen from './AboutScreen';
import HelpScreen from './HelpScreen';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';


var data = new FormData()

//Launching drawer menu
class Menu extends React.Component {
  constructor(props) {
      super(props);
      this.state = { userData: {} };
    }

  // calls the API
  login() {
      fetch('http://www.josephpboyle.com/api/swingessentials.php/login', {
        method: 'POST',
        body: data
      })
        .then((response) => {
          if (response.ok) {
            console.log('success');
            response.json()
            .then((json) => this.setState({ userData : json }))
            this.props.navigation.navigate('Home', {user: 'Theo'})
          }
          else {
            console.log('error');
          }})
        .catch((error) => console.error(error));
        }


//          this.setState({ userData : response })})
//        .catch((error) => {console.warn(error)})

//        if (this.state.userData.status === 200) {
//          this.props.navigation.navigate('Home', {user: 'Theo'})}
//        else {
//            Alert.alert('Incorrect login')
//          }
//}

  render() {
    //const { navigate } = this.props.navigation;
    console.log(this.state.userData);

    return (
      <View style={styles.container}>
        <Image source={require('./img/SE-Logo-circle.png')} />
        <FormLabel>Username</FormLabel>
        <FormInput
          placeholder="Please enter your username"
          onChangeText={(response) => data.append('username', response)}
          />
        <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            placeholder="Please enter your password"
            onChangeText={(response) => data.append('password', response)}
            />
        <Button
          raised
          title="Sign In"
          onPress={() => this.login()} //this.props.navigation.navigate('Home', {user: 'Theo'})} //
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

//Nav
const StackNav = StackNavigator({
  Login: {
    screen: Menu,
  },
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

export default StackNav

AppRegistry.registerComponent('SwingEssentials', () => StackNav);
