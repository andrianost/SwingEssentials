import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, Image, View, Text, Alert } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'


function mapStateToProps(state){
    return {
        username: state.userData.username
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class HomeScreen extends Component {
  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
