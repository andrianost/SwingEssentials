import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
      fo_flag: state.lessons.fo_flag,
      fo: state.lessons.fo,
      dtl: state.lessons.dtl,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class RedeemLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
        fo_flag: this.props.fo_flag,
        fo: this.props.fo,
        dtl: this.props.dtl,
      }
  }

  _redeemLessons(){
    this.props.redeemLessons({bearerToken: this.state.bearerToken, fo: this.state.fo, dtl: this.state.dtl})
    // .then(() => {
    //   if (this.props.response == 200) {
    //     this.setState({orderComplete: true});
    //   }
    // })
  }

  _foFlag(){
    this.setState({fo_flag: true}, function() {
      this.props.setSwingFlagSuccess({fo_flag: this.state.fo_flag});
      this.props.navigation.navigate('Camera');
    })
  }

  _dtlFlag() {
    this.setState({fo_flag: false}, function() {
      this.props.setSwingFlagSuccess({fo_flag: this.state.fo_flag});
      this.props.navigation.navigate('Camera');
    })
  }

render() {
    return (
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Record your swing</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
              raised
              title="FACE ON"
              buttonStyle={styles.button}
              onPress={this._foFlag.bind(this)}
          />
        </View>
        <View style={styles.secondButtonContainer}>
          <Button
              raised
              title="DOWN THE LINE"
              buttonStyle={styles.button}
              onPress={this._dtlFlag.bind(this)}
          />
        </View>
        <View style={styles.secondButtonContainer}>
          <Button
              raised
              title="SUBMIT ORDER"
              buttonStyle={styles.button}
              // disabled={this.state.orderComplete == true}
              onPress={this._redeemLessons.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  headerText: {
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  secondButtonContainer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#231f61',
    opacity:.8
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RedeemLessonsScreen);
