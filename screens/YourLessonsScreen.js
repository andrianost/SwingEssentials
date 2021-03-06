import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
      pending: state.lessons.pending,
      closed: state.lessons.closed,
      request_id: state.lessons.request_id,
      request_date: state.lessons.request_date,
      request_url: state.lessons.request_url,
      request_notes: state.lessons.request_notes,
      response_notes: state.lessons.response_notes,
      response_video: state.lessons.response_video,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class YourLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          bearerToken: this.props.token,
          pending: this.props.pending,
          closed: this.props.closed,
          request_id: this.props.request_id,
          request_date: this.props.request_date,
          request_url: this.props.request_url,
          request_notes: this.props.request_notes,
          response_notes: this.props.response_notes,
          viewed: this.props.viewed,
          response_video: this.props.response_video,
      }
  }

  async _requestID(data){
    await this.setState({from: ''})
    await this.props.setFrom({from: this.state.from})
    this.props.setRequestId(data)
    this.props.navigation.navigate('IndividualLessonsScreen')
  }

  _updateViewedStatus(data){
    this.props.updateViewedStatus(data)
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.request_date}
        titleStyle = {styles.listItemTitle}
        rightTitle={(item.viewed===0)?'NEW!':null}
        rightTitleStyle = {styles.listItemRightTitle}
        onPress={ () => {this._requestID({request_id: item.request_id,
                                          request_date: item.request_date,
                                          request_url: item.request_url,
                                          request_notes: item.request_notes,
                                          response_notes: item.response_notes,
                                          response_video: item.response_video});
                        this._updateViewedStatus({request_id: item.request_id, bearerToken: this.props.token});}}
      />
    )
  }

  _pendingHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>In Progress</Text>
      </View>
    )
  }

  _emptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyContainerTitle}>You have no active lessons</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Completed</Text>
          </View>
            <FlatList
              data={this.props.closed}
              scrollEnabled={false}
              keyExtractor={item => item.request_id}
              renderItem={this._renderItem.bind(this)}
              ListEmptyComponent={this._emptyComponent}
            />
        </View>
      </View>
      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8
  },
  emptyContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    opacity:.8
  },
  text: {
    paddingLeft: 19,
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  listItemTitle: {
    color:"#231f61",
    opacity:.8,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: '#c1c1c1',
  },
  emptyContainerTitle: {
    color:"#231f61",
    opacity:.8,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: '#c1c1c1',
    paddingLeft: 15,
  },
  listItemRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  },
  inProgressContainer: {
    paddingBottom: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(YourLessonsScreen);
