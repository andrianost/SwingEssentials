import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import AppIndicator from './ActivityIndicator.js';
import {atob} from '../utils/base64.js'

import { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';
import Video from 'react-native-video';


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
        role: 'pending',
        progress: 0,
      }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.orderSubmitted == true){
        this.setState({successModalVisible: true})
    }
    const role = JSON.parse(atob(this.props.token.split('.')[1])).role;
    this.setState({role: role});
  }

  componentWillMount(){
    this.props.requestLessons(this.state.bearerToken);
    if (this.props.pending.length > 0){
      this.props.navigation.navigate('PendingLessons')
      }
    const role = JSON.parse(atob(this.props.token.split('.')[1])).role;
    this.setState({role: role});
  }

  componentDidMount(){
    this.props.requestLessons(this.state.bearerToken);
  }

  _redeemLessons(){
    this.props.setModalVisible(true)
    this.props.redeemLessons({bearerToken: this.state.bearerToken, fo: this.state.fo, dtl: this.state.dtl}, this._updateProgress.bind(this))
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

  _updateProgress(event){
      this.setState({progress: ((event.loaded/event.total)*100).toFixed(2)});
  }

render() {
    return (
      <View style={styles.topContainer}>
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Record your swing</Text>
        </View>
        {this.state.role == 'pending' && <FormValidationMessage>You must validate your email address before you can submit lessons.</FormValidationMessage>}
        <View style={styles.topParentContainer}>
          <View style={styles.parentContainer}>
            <TouchableOpacity disabled={this.state.role == 'pending'} onPress={this._foFlag.bind(this)}>
              <View style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                  {this.state.fo == '' && <Image source={require('./img/SELogo-15.png')} />}
                  {!this.state.fo == '' && <Video source={{uri: this.state.fo}}
                                                  shouldPlay
                                                  repeat={true}
                                                  muted={true}
                                                  resizeMode="cover"
                                                  style={{ width: 250, height: 250 }}
                  />}
                </View>
                  <Button
                      raised
                      title="FACE ON"
                      buttonStyle={styles.button}
                      disabled={this.state.role == 'pending'}
                      onPress={this._foFlag.bind(this)}
                  />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topParentContainer}>
          <View style={styles.parentContainer}>
            <TouchableOpacity disabled={!this.state.fo} onPress={this._dtlFlag.bind(this)}>
              <View style={styles.secondButtonContainer}>
                <View style={styles.bottomIconContainer}>
                  {this.state.dtl == '' && <Image source={require('./img/SELogo-16.png')} />}
                  {!this.state.dtl == '' && <Video source={{uri: this.state.dtl}}
                                                  shouldPlay
                                                  repeat={true}
                                                  muted={true}
                                                  resizeMode="cover"
                                                  style={{ width: 250, height: 250 }}
                  />}
                </View>
                  <Button
                      raised
                      title="DOWN THE LINE"
                      buttonStyle={styles.button}
                      disabled={!this.state.fo}
                      onPress={this._dtlFlag.bind(this)}
                  />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.thirdButtonContainer}>
          <Button
              raised
              title="SUBMIT ORDER"
              buttonStyle={styles.button}
              disabled={!this.state.fo || !this.state.dtl}
              onPress={this._redeemLessons.bind(this)}
          />
            <Modal transparent={true} visible={this.props.modalVisible} onRequestClose={() => null}>
            <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around'}}>
              <View style={styles.indicatorModal}>
                <View style={styles.indicator}>
                  <AppIndicator/>
                </View>
                <View style={styles.indicator}>
                  {this.state.progress < 100 && <Text style={styles.indicatorText}>Uploading Video Files... {this.state.progress}%</Text>}
                  {this.state.progress >= 100 && <Text style={styles.indicatorText}>Creating lesson...</Text>}
                </View>
              </View>
              </View>
            </Modal>
          <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible} onRequestClose={() => null}>
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
        </ScrollView>
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
  thirdButtonContainer: {
    paddingTop: 20,
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
   alignItems: 'stretch',
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
   alignItems: 'center',
   textAlign: 'center'
 },
 modalBorder: {
   borderBottomColor: '#231f61',
   borderWidth: .5,
   width: 300,
 },
 iconContainer: {
   alignItems: 'center',
   justifyContent: 'space-around',
   paddingBottom: 10,
 },
 bottomIconContainer: {
   alignItems: 'center',
   justifyContent: 'space-around',
   paddingBottom: 10,
   paddingTop: 15
 },
 parentContainer: {
   borderWidth: 1,
   borderColor: '#231f61',
   justifyContent: 'space-around',
 },
 topParentContainer: {
   paddingTop: 10,
 },
 indicator: {
  alignItems: 'stretch',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: 15,
},
indicatorText: {
  // padding: 10,
  color: '#231f61',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center'
},
indicatorModal: {
  flex: 0,
  alignItems: 'center',
  flexDirection: 'row',
  // justifyContent: 'space-around',
  backgroundColor: '#00000040',
},
});

export default connect(mapStateToProps, mapDispatchToProps)(RedeemLessonsScreen);
