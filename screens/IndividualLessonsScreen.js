import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import VideoPlayer from 'react-native-video-player';
// import YouTube from 'react-native-youtube';

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
      request_url: state.lessons.request_url,
      request_notes: state.lessons.request_notes,
      response_notes: state.lessons.response_notes,
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

// const YOUTUBE_ID = 'https://www.youtube.com/watch?v=ogaxg5J_F_8';

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
      }
  }

  render() {
    console.log(this.props.request_id)
    return (
      <View>
        <View style={styles.container}>
          <Text style={{fontSize: 25}}>{this.props.request_date}</Text>
        </View>
        <View>
          <VideoPlayer/>
        </View>
        <View style={styles.container}>
          <Text style={styles.notes}>Comments</Text>
          <Text style={styles.border}>{this.props.response_notes}</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 150,
    paddingRight: 150,
  },
  notes: {
    fontWeight: 'bold',
    fontSize: 25,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualLessonsScreen);
