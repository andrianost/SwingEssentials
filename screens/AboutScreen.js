import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function mapStateToProps(state){
    return {
        username: state.userData.username
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About screen!</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
