import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Picker } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import SmartPicker from 'react-native-smart-picker'

function mapStateToProps(state){
    return {
      handedness: state.settings.handedness,
      duration: state.settings.camera.duration,
      delay: state.settings.camera.delay,
      overlay: state.settings.camera.overlay,
      token: state.login.token,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class UserData extends Component {
  constructor(props){
      super(props);
      this.state = {
          handedness: this.props.handedness,
          bearerToken: this.props.token,
          duration: this.props.duration,
          delay: this.props.delay,
          overlay: this.props.overlay
      }
  }

  _onSettingsUpdate(newSelection){
    this.setState({handedness: newSelection});
    this.props.userSettingsUpdate({handedness: newSelection, bearerToken: this.state.bearerToken});
  }

  render() {
    return (
        <ScrollView>
          <SmartPicker
            selectedValue={this.state.handedness}
            label='Select your swing:'
            onValueChange={ (newSelection) => this._onSettingsUpdate(newSelection)}
          >
            <Picker.Item label='Right' value='right' />
            <Picker.Item label='Left' value='left' />
          </SmartPicker>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
