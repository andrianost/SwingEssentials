import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import VideoPlayer from 'react-native-video-player';
import YouTube from 'react-native-youtube';

import { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';


function mapStateToProps(state){
    return {
      lessons: state.lessons,
      pending: state.lessons.pending,
      closed: state.lessons.closed,
      request_id: state.lessons.request_id,
      request_date: state.lessons.request_date,
      request_url: state.lessons.request_url
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

const YOUTUBE_ID = 'https://www.youtube.com/watch?v=ogaxg5J_F_8';

class IndividualLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          lessons: this.props.lessons,
          pending: this.props.pending,
          closed: this.props.closed,
          request_id: this.props.request_id,
          request_date: this.props.request_date,
          request_url: this.props.request_url
      }
  }

  render() {
    console.log(this.props.request_id)
    return (
      <View>
        <Text>Individual Lessons Screen</Text>
        <Text>{this.props.request_id}</Text>
        <Text>{this.props.request_date}</Text>
        <Text>{this.props.request_url}</Text>
        <VideoPlayer
          video={{ uri: 'https://www.youtube.com/embed/ogaxg5J_F_8' }}
          // endWithThumbnail
          // thumbnail={{ uri: this.state.thumbnailUrl }}
          // video={{ uri: this.state.videoUrl }}
          // videoWidth={this.state.video.width}
          // videoHeight={this.state.video.height}
          // duration={this.state.video.duration/* I'm using a hls stream here, react-native-video
          //   can't figure out the length, so I pass it here from the vimeo config */}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualLessonsScreen);
