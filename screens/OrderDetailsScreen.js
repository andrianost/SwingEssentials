import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements'

function mapStateToProps(state){
    return {
      name: state.packages.name,
      description: state.packages.description,
      price: state.packages.price
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class OrderDetailsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: this.props.name,
        description: this.props.description,
        price: this.props.price
      }
  }

  render() {
    return (
      <View>
        <Text>Order Details</Text>
        <Text>{this.props.name}</Text>
        <Text>{this.props.description}</Text>
        <Text>{this.props.price}</Text>
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
    height: 120,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
