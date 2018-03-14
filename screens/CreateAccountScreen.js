import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';


import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import {FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';

function mapStateToProps(state){
    return {
      response: state.userData.response
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class CreateAccountScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            createAccount: false,
            createAccountFailure: false,
            response: this.props.response
        }
    }

    _createAccount(){
        this.props.createAccount({username: this.state.username,
                                  firstName: this.state.firstName,
                                  lastName: this.state.lastName,
                                  email: this.state.email,
                                  password: this.state.password,
                                  phone: this.state.phone})
        .then(() => {
          if (this.props.response.status == 200) {
            this.setState({createAccount: true});
          } else {
            this.setState({createAccountFailure: true});
          }
        })
    }

    render(){
        return(
          <View>
            <View style={styles.container}>
                <FormLabel>First Name</FormLabel>
                <FormInput
                    value={this.state.firstName}
                    placeholder="Please enter your first name"
                    onChangeText={(newText) => this.setState({firstName: newText})}
                />
                <FormLabel>Last Name</FormLabel>
                <FormInput
                    value={this.state.lastName}
                    placeholder="Please enter your last name"
                    onChangeText={(newText) => this.setState({lastName: newText})}
                />
                <FormLabel>Phone # (optional)</FormLabel>
                <FormInput
                    value={this.state.phone}
                    placeholder="Please enter your phone number"
                    onChangeText={(newText) => this.setState({phone: newText})}
                />
                <FormLabel>Email</FormLabel>
                <FormInput
                    value={this.state.email}
                    placeholder="Please enter your email address"
                    onChangeText={(newText) => this.setState({email: newText})}
                />
                <FormLabel>Enter Username</FormLabel>
                <FormInput
                    value={this.state.username}
                    placeholder="Please enter your username"
                    onChangeText={(newText) => this.setState({username: newText})}
                />
                <FormLabel>Enter Password</FormLabel>
                <FormInput
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder="Please enter your password"
                    onChangeText={(newText) => this.setState({password: newText})}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                  buttonStyle={styles.button}
                  title="CREATE ACCOUNT"
                  disabled={!this.state.firstName || !this.state.lastName ||
                            !this.state.email || !this.state.username ||
                            !this.state.password || this.state.createAccount == true}
                  onPress={this._createAccount.bind(this)}
              />
              {this.state.createAccount == true && <FormValidationMessage>Your account has been created!</FormValidationMessage>}
              {this.state.createAccountFailure == true && <FormValidationMessage>Username and/or email is unavailable</FormValidationMessage>}
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
    backgroundColor: "#231f61",
    opacity: .8
  },
  buttonContainer: {
    paddingTop: 20,
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen);
