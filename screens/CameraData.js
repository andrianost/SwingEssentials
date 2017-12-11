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

class CameraData extends Component {
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

  _onDurationUpdate(newSelection){
    this.setState({duration: newSelection});
    this.props.userSettingsUpdate({duration: newSelection, bearerToken: this.state.bearerToken});
  }

  _onDelayUpdate(newSelection){
    this.setState({delay: newSelection});
    this.props.userSettingsUpdate({delay: newSelection, bearerToken: this.state.bearerToken});
  }

  _onOverlayUpdate(newSelection){
    this.setState({overlay: newSelection});
    this.props.userSettingsUpdate({overlay: newSelection, bearerToken: this.state.bearerToken});
  }

  render() {
    return (
      <ScrollView>
        <SmartPicker
          selectedValue={this.state.duration}
          label='Select your duration:'
          onValueChange={ (newSelection) => this._onDurationUpdate(newSelection)}
        >
          <Picker.Item label='One' value='1' />
          <Picker.Item label='Two' value='2' />
          <Picker.Item label='Three' value='3' />
          <Picker.Item label='Four' value='4' />
          <Picker.Item label='Five' value='5' />
          <Picker.Item label='Six' value='6' />
          <Picker.Item label='Seven' value='7' />
          <Picker.Item label='Eight' value='8' />
          <Picker.Item label='Nine' value='9' />
          <Picker.Item label='Ten' value='10' />
        </SmartPicker>
        <SmartPicker
          selectedValue={this.state.delay}
          label='Select your delay:'
          onValueChange={ (newSelection) => this._onDelayUpdate(newSelection)}
        >
          <Picker.Item label='One' value='1' />
          <Picker.Item label='Two' value='2' />
          <Picker.Item label='Three' value='3' />
          <Picker.Item label='Four' value='4' />
          <Picker.Item label='Five' value='5' />
          <Picker.Item label='Six' value='6' />
          <Picker.Item label='Seven' value='7' />
          <Picker.Item label='Eight' value='8' />
          <Picker.Item label='Nine' value='9' />
          <Picker.Item label='Ten' value='10' />
        </SmartPicker>
        <SmartPicker
          selectedValue={this.state.overlay}
          label='Select your overlay:'
          onValueChange={ (newSelection) => this._onOverlayUpdate(newSelection)}
        >
          <Picker.Item label='True' value={true} />
          <Picker.Item label='False' value={false} />
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
