'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions.js';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';


function mapStateToProps(state){
    return {
      token: state.login.token,
      fo: state.lessons.fo,
      dtl: state.lessons.dtl,
      fo_flag: state.lessons.fo_flag,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class CameraScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
        fo: this.props.fo,
        dtl: this.props.dtl,
        fo_flag: this.props.fo_flag,
        successModalVisible: false,
        recording: false,
        timeout: 0,
      }
  }

  _startRecord = async function() {
    this.setState({recording: true});
    if (this.camera) {
      const options = { maxFileSize: 9961472, quality: RNCamera.Constants.VideoQuality['480p'] };
      const data = await this.camera.recordAsync(options)

      if (this.props.fo_flag == true){
        this.setState({fo: data.uri}, function() {
          this.props.setFoUriSuccess({fo: this.state.fo})
          this.setState({successModalVisible: true})
          console.log(this.state.fo)
        })

      }
      else if (this.props.fo_flag == false){
        this.setState({dtl: data.uri}, function() {
          this.props.setDtlUriSuccess({dtl: this.state.dtl})
          this.setState({successModalVisible: true})
        })
      }
    }
  };

  _stopRecord() {
    this.camera.stopRecording();
    this.setState({recording: false});
  }

  _timeout() {
    console.log('timeout')
    if (this.state.timeout == 0){
      this.setState({timeout: 3})
    }
    else if (this.state.timeout == 3){
      this.setState({timeout: 10})
    }
    else {
      this.setState({timeout: 0})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end',}}>
          <TouchableOpacity
              onPress={ () => {
                if (this.state.recording) {
                  this._stopRecord();
                } else {
                setTimeout(() => this._startRecord(), (this.state.timeout * 1000));
              }
            }
          }
          >
          {!this.state.recording && <Icon name="fiber-manual-record" color="red" size={100}/>}
          {this.state.recording && <Icon name="stop" color="red" size={100}/>}
          </TouchableOpacity>
          <TouchableOpacity
              onPress={this._timeout.bind(this)}
          >
            {this.state.timeout == 0 && <Icon name="exposure-zero" color="white" size={100}/>}
            {this.state.timeout == 3 && <Icon name="timer-3" color="white" size={100}/>}
            {this.state.timeout == 10 && <Icon name="timer-10" color="white" size={100}/>}
          </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible}>
          <View style={styles.successModal}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>Your video has been successfully recorded.</Text>
              <View style={styles.modalBorder}>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RedeemLessons')}>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
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
});

AppRegistry.registerComponent('CameraScreen', () => CameraScreen);

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
