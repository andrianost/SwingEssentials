import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import YouTube from 'react-native-youtube';

import { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';


function mapStateToProps(state){
    return {
      lessons: state.lessons,
      pending: state.lessons.pending,
      closed: state.lessons.closed,
      request_id: state.lessons.request_id,
      request_date: state.lessons.request_date,
      request_url: state.lessons.request_url,
      request_notes: state.lessons.request_notes,
      response_notes: state.lessons.response_notes,
      response_video: state.lessons.response_video
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class IndividualLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          lessons: this.props.lessons,
          pending: this.props.pending,
          closed: this.props.closed,
          request_id: this.props.request_id,
          request_date: this.props.request_date,
          request_url: this.props.request_url,
          request_notes: this.props.request_notes,
          response_notes: this.props.response_notes,
          response_video: this.props.response_video
      }
  }

  componentWillMount(){
    if (this.props.response_video == null){
      this.props.navigation.navigate('PendingLessons')
      }
  }

  render() {
    console.log("response video")
    console.log(this.props.response_video)
    return (
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.text}>{this.props.request_date}</Text>
        </View>
        <View>
          <YouTube
            videoId={this.props.response_video}//"noU5_4L6H3o"  // The YouTube video ID
            play={true}             // control playback of video with true/false
            fullscreen={false}       // control whether the video should play in fullscreen or inline
            loop={true}             // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}

            style={{ alignSelf: 'stretch', height: 275 }}
          />
        </View>
        <View style={styles.commentsContainer}>
          <View style={styles.header}>
            <Text style={styles.text}>Comments</Text>
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.responseText}>{this.props.response_notes}</Text>
            </ScrollView>
          </View>
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
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 150,
    paddingRight: 150,
  },
  text: {
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  responseText: {
    color: '#231f61',
    fontSize: 16,
  },
  commentsContainer: {
    paddingTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualLessonsScreen);
