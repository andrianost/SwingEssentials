import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class RedeemLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
      }
  }

  _redeemLessons(){
    console.log('token')
    console.log(this.state.bearerToken)
    this.props.redeemLessons({bearerToken: this.state.bearerToken})
    // .then(() => {
    //   if (this.props.response == 200) {
    //     this.setState({orderComplete: true});
    //   }
    // })
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Record your swing</Text>
        </View>
        <View style={styles.button}>
          <Button
              raised
              title="Face On"
              // onPress={this._submitOrder.bind(this)}
          />
        </View>
        <View style={styles.button1}>
          <Button
              raised
              title="Down the Line"
              // onPress={this._submitOrder.bind(this)}
          />
        </View>
        <View style={styles.button1}>
          <Button
              raised
              title="Submit Order"
              // disabled={this.state.orderComplete == true}
              onPress={this._redeemLessons.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  headerText: {
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  button1: {
    paddingBottom: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RedeemLessonsScreen);
