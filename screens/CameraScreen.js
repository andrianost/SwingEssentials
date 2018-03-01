'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions.js';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';


function mapStateToProps(state){
    return {
      token: state.login.token,
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
        dtl: this.props.dtl
      }
  }

  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options)
  //     console.log(data.uri);
  //   }
  // };

  _startRecord = async function() {
    if (this.camera) {
      const options = { maxDuration: 10 };
      const data = await this.camera.recordAsync(options)

      this.props.redeemLessons({bearerToken: this.state.bearerToken, fo: data.uri, dtl: data.uri})
    }
  };

  _stopRecord() {
    this.camera.stopRecording();
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
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this._startRecord.bind(this)}
            // onPressOut={this._stopRecord.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Record </Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 6/2,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

AppRegistry.registerComponent('CameraScreen', () => CameraScreen);

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
