import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import MapView from './MapView.js';


import { NativeModules } from 'react-native';

import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import {FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';

function mapStateToProps(state){
    return {
      response: state.login.response.status
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class ResetPasswordScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            resetPassword: false,
            response: this.props.response,
            Sandbox: 'sandbox_2pqkx4x6_g7sz9ynwdm65gwxj'

        }
    }

    _resetPassword(){
        console.log('reset password')
        this.props.resetPassword({userEmail: this.state.userEmail})
        .then(() => {
          if (this.props.response == 200) {
            this.setState({resetPassword: true});
          }
        })
    }

    _PayPal(){
    console.log('PayPal log')
    // var PayPal = NativeModules.PayPal;
    NativeModules.PayPal.buyAction()//('sandbox_2pqkx4x6_g7sz9ynwdm65gwxj'); //{Sandbox: this.state.Sandbox}
    // NativeModules.ChangeViewBridge.changeToNativeView()
    }

  //   render() {
  //     return <MapView />;
  //   }
  // }

    render(){
      return(
          <View style={styles.container}>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                  value={this.state.userEmail}
                  placeholder="Please enter your email address"
                  onChangeText={(newText) => this.setState({userEmail: newText})}
              />
              <Button
                  raised
                  title="PASSWORD RESET"
                  buttonStyle={styles.button}
                  disabled={!this.state.userEmail || this.state.resetPassword == true}
                  onPress={this._PayPal.bind(this)}//{this._resetPassword.bind(this)}//
              />
              {this.state.resetPassword == true && <FormValidationMessage>Please check your email to reset your password</FormValidationMessage>}
          </View>
        )
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#231f61',
    opacity:.8
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
