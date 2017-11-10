import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Button, Image, TextInput, Alert } from 'react-native';

//Username capture, password capture and login button.
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
    this.state = {password: ''};
  }

  render() {
    return (
      <View style={styles.loginView}>
        <TextInput
          style={styles.loginText}
          placeholder="Username"
          onChangeText={(response) => this.setState({username: response})}
        />
        <TextInput
          style={styles.loginText}
          placeholder="Password"
          onChangeText={(response) => this.setState({password: response})}
        />
      </View>
    );
  }
}

export default class LoginScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Image source={require('./img/SE-Logo-circle.png')} />
        <Login/>
        <Button
          title="Sign In"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.title}>Welcome to the Native Navigation Example!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18
  },
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  loginView: {
    padding: 10
  },
  loginText: {
    padding: 10,
    height: 40,
    borderColor: 'grey',
    borderWidth: 0.5,
    paddingLeft: 75,
    paddingRight: 75
  }
});

AppRegistry.registerComponent('SwingEssentials', () => LoginScreen);
