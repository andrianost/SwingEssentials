import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function mapStateToProps(state){
    return {
        username: state.userData.username,
        token: state.login.token,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class LogoutScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
      }
  }

  componentWillMount(){
    console.log('component will mount')
    this.props.logout({bearerToken: this.state.bearerToken});
    this.props.navigation.navigate('Login')
  }

  // componentDidMount(){
  //   console.log('component did mount')
  //   this.props.navigation.navigate('Login')
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>You have successfully logged out!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
