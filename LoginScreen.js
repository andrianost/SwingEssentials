import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Button, Image, TextInput, Alert } from 'react-native';

const values = {
      username: '',
      password: ''
  }

export default class LoginScreen extends Component {
  constructor(props) {
      super(props);
      this.state = { userData: {} };
    }

  // calls the API
  login() {
      fetch('http://www.josephpboyle.com/api/swingessentials.php/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'tandrianos',
            password: 'iheartpenis'
          })
      })
        .then((response) => {
          // In this case, we check the content-type of the response
          if (response.headers.get('content-type').match(/application\/json/)) {
            return response.json();
          }
          return response;
          // You can also try "return response.text();"
        })
              .then((data) => {
                      this.setState({ userData : data })
                  })
                      .catch((error) => {
                      console.warn(error);
                    });
                  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.userData);
    console.log(values);

    return (
      <View style={styles.container}>
        <Image source={require('./img/SE-Logo-circle.png')} />
        <TextInput
          style={styles.loginText}
          placeholder="Username"
          onChangeText={(response) => values.username = response}
        />
        <TextInput
          style={styles.loginText}
          placeholder="Password"
          onChangeText={(response) => values.password = response}
        />
        <Button
          title="Sign In"
          onPress={() => this.login()}
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
