import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

function mapStateToProps(state){
    return {
      progress: state.lessons.progress,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

export class AppIndicator extends Component {
  constructor(props){
      super(props);
      this.state = {
        progress: this.props.progress,
      }
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

AppRegistry.registerComponent('AppIndicator', () => AppIndicator)

export default connect(mapStateToProps, mapDispatchToProps)(AppIndicator);
