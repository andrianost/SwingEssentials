import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import AppIndicator from './ActivityIndicator.js';

import { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
      fo_flag: state.lessons.fo_flag,
      fo: state.lessons.fo,
      dtl: state.lessons.dtl,
      pending: state.lessons.pending,
      modalVisible: state.lessons.modalVisible,
      orderSubmitted: state.lessons.orderSubmitted,
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
        pending: this.props.pending,
        modalVisible: this.props.modalVisible,
        orderSubmitted: this.props.orderSubmitted,
        successModalVisible: false,
      }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.orderSubmitted == true){
        this.setState({successModalVisible: true})
    }
  }

  componentWillMount(){
    this.props.requestLessons(this.state.bearerToken);
    if (this.props.pending.length > 0){
      this.props.navigation.navigate('PendingLessons')
      }
  }

  componentDidMount(){
    this.props.requestLessons(this.state.bearerToken);
  }

  _redeemLessons(){
    this.props.setModalVisible(true)
    this.props.redeemLessons({bearerToken: this.state.bearerToken, fo: this.state.fo, dtl: this.state.dtl})
    this.props.requestLessons(this.state.bearerToken);
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
              disabled={!this.state.fo}
              onPress={this._dtlFlag.bind(this)}
          />
        </View>
        <View style={styles.secondButtonContainer}>
          <Button
              raised
              title="SUBMIT ORDER"
              buttonStyle={styles.button}
              disabled={!this.state.fo || !this.state.dtl}
              onPress={this._redeemLessons.bind(this)}
          />
          <Modal transparent={true} visible={this.props.modalVisible}>
            <AppIndicator/>
          </Modal>
          <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible}>
            <View style={styles.successModal}>
              <View style={styles.modalButton}>
                <Text style={styles.modalText}>Your videos have been submitted successfully!</Text>
                <View style={styles.modalBorder}>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RedeemLessonsScreen);
