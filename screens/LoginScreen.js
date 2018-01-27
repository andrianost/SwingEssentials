import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';


import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import {FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';

// This is where we specify which values in the store we want to listen for changes on
// these values will get mapped into props so a re-render will trigger whenever they change
function mapStateToProps(state){
    return {
        username: state.userData.username,
        loginFails: state.login.failCount,
        token: state.login.token
    };
}

// this allows us to call dispatch commands from the props
// each action that we want to map should be listed here, or
// we can use bindActionCreators to do them all in bulk
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.username){
            this.props.navigation.navigate('Home');
        }
        else{
            this.setState({password: ''});
            // TODO: if failure > 3 locked out
        }
    }

    _onLogin(){
        this.props.requestLogin({username: this.state.username, password: this.state.password});
    }

    _resetPassword(){
        this.props.navigation.navigate('ResetPassword');
    }

    _createAccount(){
        this.props.navigation.navigate('CreateAccount');
    }

    render(){
        return(
            <View>
              <View style={styles.container}>
                  <Image source={require('./img/SE-Logo-circle.png')} />
                  <FormLabel>Username</FormLabel>
                  <FormInput
                      value={this.state.username}
                      placeholder="Please enter your username"
                      onChangeText={(newText) => this.setState({username: newText})}
                  />
                  <FormLabel>Password</FormLabel>
                  <FormInput
                      value={this.state.password}
                      secureTextEntry={true}
                      placeholder="Please enter your password"
                      onChangeText={(newText) => this.setState({password: newText})}
                  />
                  {this.props.loginFails > 0 && <FormValidationMessage>The username/password you entered was not correct.</FormValidationMessage>}
                  <Button
                      raised
                      title="Sign In"
                      disabled={!this.state.username || !this.state.password}
                      onPress={this._onLogin.bind(this)}
                  />
              </View>
              <View>
                <Button
                    title="Forgot Password"
                    color="blue"
                    backgroundColor="white"
                    onPress={this._resetPassword.bind(this)}
                />
              </View>
              <View>
                <Button
                    title="Create Account"
                    color="blue"
                    backgroundColor="white"
                    onPress={this._createAccount.bind(this)}
                />
              </View>
            </View>
          )
    }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,

  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
