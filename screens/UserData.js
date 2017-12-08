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
      token: state.login.token,
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

//Fix to select new value and update the store
class UserData extends Component {
  constructor(props){
      super(props);
      this.state = {
          handednessSelection: '',
          bearerToken: ''
      }
  }

  _onSettingsUpdate(newSelection){
    this.setState({handednessSelection: newSelection});
    this.setState({bearerToken: this.props.token});
    this.props.userSettingsUpdate({handednessSelection: newSelection, bearerToken: this.state.bearerToken});
  }

  render() {
    return (
        <ScrollView>
          <SmartPicker
            defaultSelectedValue={this.props.handedness}
            selectedValue={this.state.handednessSelection}
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
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
