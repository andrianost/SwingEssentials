import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'
import { DrawerNavigator } from 'react-navigation';


export default class YourLessonsScreen extends Component {
  constructor(props) {
    super(props);
  }

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
      <View style={styles.buttonContainer}>
        <View style={styles.title}>
          <Text>Order a lesson</Text>
          <Text>3 packages available</Text>
        </View>
        <Button
          large
          iconRight={{name: 'dehaze', color: 'black', size: 40}}
          buttonStyle={styles.button1}
          raised
          title="Par: 1 Lesson $14.99"
          onPress={() =>  this.props.navigation.navigate('Home', {user: 'Theo'})} //this.login()}
        />
        <Button
          large
          iconRight={{name: 'dehaze', color: 'black', size: 40}}
          buttonStyle={styles.button2}
          raised
          title="Eagle: 5 Lessons $39.99"
          onPress={() =>  this.props.navigation.navigate('Home', {user: 'Theo'})} //this.login()}
        />
        <Button
          large
          iconRight={{name: 'dehaze', color: 'black', size: 40}}
          buttonStyle={styles.button3}
          raised
          title="Albatrose: Unlimited $59.99"
          onPress={() =>  this.props.navigation.navigate('Home', {user: 'Theo'})} //this.login()}
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
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    width: 400,
    height: 120,
    alignItems: 'center',
  },
  button1: {
    width: 400,
    height: 120,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button2: {
    width: 400,
    height: 120,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button3: {
    width: 400,
    height: 150,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

AppRegistry.registerComponent('SwingEssentials', () => OrderLessonsScreen);
