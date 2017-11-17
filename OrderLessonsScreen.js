import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { DrawerNavigator } from 'react-navigation';


export default class YourLessonsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Swing Essentials',
      drawerLabel: 'Order Lessons',
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
        <Text>Order lessons screen!</Text>
        <Text>Chat with {params.user}</Text>
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

AppRegistry.registerComponent('SwingEssentials', () => OrderLessonsScreen);
