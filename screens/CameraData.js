import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function mapStateToProps(state){
    return {
      duration: state.settings.camera.duration,
      delay: state.settings.camera.delay,
      overlay: state.settings.camera.overlay,
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class CameraData extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Camera Data Screen!</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraData);
