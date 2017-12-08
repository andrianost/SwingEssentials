import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Picker } from 'react-native';
import SmartPicker from 'react-native-smart-picker'

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
      <ScrollView>
        <SmartPicker
          selectedValue={this.props.duration}
          label='Select your duration:'
          onValueChange={() => {this.handleChange}}
        >
          <Picker.Item label='Right' value='right' />
          <Picker.Item label='Left' value='left' />
        </SmartPicker>
        <SmartPicker
          selectedValue={this.props.delay}
          label='Select your delay:'
          onValueChange={() => {this.handleChange}}
        >
          <Picker.Item label='Right' value='right' />
          <Picker.Item label='Left' value='left' />
        </SmartPicker>
        <SmartPicker
          selectedValue={this.props.overlay}
          label='Select your overlay:'
          onValueChange={() => {this.handleChange}}
        >
          <Picker.Item label='True' value='true' />
          <Picker.Item label='False' value='false' />
        </SmartPicker>
      </ScrollView>
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
