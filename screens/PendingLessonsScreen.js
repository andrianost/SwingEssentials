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

class PendingLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Your lesson is pending review.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingLessonsScreen);
