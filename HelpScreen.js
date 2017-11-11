import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';


export default class HelpScreen extends Component {
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
      <View style={styles.container}>
        <Text>Help screen!</Text>
        <Button
          title="Go back home"
          onPress={() => this.props.navigation.goBack()}
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

AppRegistry.registerComponent('SwingEssentials', () => HelpScreen);
