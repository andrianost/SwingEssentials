import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';


import { StyleSheet, View, TouchableHighlight, Image, Modal, Text, TouchableOpacity } from 'react-native';
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
            response: this.props.response,
            successModalVisible: false
        }
    }

    _createAccount(){
        if (!this.state.username.match(/^[A-Z0-9-_.$#@!+]+$/i)) {
          this.setState({createAccountFailure: true});
        } else {
          this.props.createAccount({username: this.state.username,
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    email: this.state.email,
                                    password: this.state.password,
                                    phone: this.state.phone})
          .then(() => {
            if (this.props.response.status == 200) {
              this.setState({createAccount: true});
              this.setState({createAccountFailure: false});
              this.setState({successModalVisible: true})
            } else {
              this.setState({createAccountFailure: true});
            }
          })
        }
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
              {this.state.createAccountFailure == true && <FormValidationMessage>Username and/or email is unavailable or invalid. Username may only contain Letters, Numbers, and Special Characters(-_.$@!+).  Spaces are not allowed.</FormValidationMessage>}
            </View>
            <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible}>
              <View style={styles.successModal}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalText}>Your account has been successfully created! Please check your email to validate your account.</Text>
                  <View style={styles.modalBorder}>
                  </View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.modalButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          )
    }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: "#231f61",
    opacity: .8
  },
  buttonContainer: {
    paddingTop: 20,
  },
  successModal: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalButton: {
   alignItems: 'center',
   backgroundColor: 'white',
   padding: 20,
  },
  modalText: {
   paddingLeft: 18,
   paddingBottom: 15,
   color: '#231f61',
   alignItems: 'center'
  },
  modalButtonText: {
   paddingTop: 15,
   color: '#231f61',
   alignItems: 'center'
  },
  modalBorder: {
   borderBottomColor: '#231f61',
   borderWidth: .5,
   width: 300,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen);
