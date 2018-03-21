import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

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

    render(){
      return(
        <View>
          <View style={styles.container}>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                  value={this.state.userEmail}
                  placeholder="Please enter your email address"
                  onChangeText={(newText) => this.setState({userEmail: newText})}
              />
          </View>
          <View style={styles.buttonContainer}>
            <Button
                title="PASSWORD RESET"
                buttonStyle={styles.button}
                disabled={!this.state.userEmail || this.state.resetPassword == true}
                onPress={this._resetPassword.bind(this)}
            />
            {this.state.resetPassword == true && <FormValidationMessage>Please check your email to reset your password</FormValidationMessage>}
          </View>
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
  buttonContainer: {
    paddingTop: 20,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
