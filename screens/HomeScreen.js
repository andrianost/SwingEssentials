import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, Image, View, Text, Alert } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';

function mapStateToProps(state){
    return {
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class HomeScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
      }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.container}>
        <Button
          title="Redeem a Lesson"
          buttonStyle={styles.CircleShapeView}
          onPress={() =>  this.props.navigation.navigate('RedeemLessons')}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Order a Lesson"
          buttonStyle={styles.CircleShapeView}
          onPress={() => this.props.navigation.navigate('OrderLessons')}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50
  },
  CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#231f61',
    opacity:.8 
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
