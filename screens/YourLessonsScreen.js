import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
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
      }
  }

  _requestID(data){
    this.props.setRequestId(data)
    this.props.navigation.navigate('IndividualLessonsScreen')
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.request_date}
        titleStyle = {{fontSize: 18}}
        // subtitle={item.request_id}
        onPress={ () => this._requestID({request_id: item.request_id, request_date: item.request_date, request_url: item.request_url, request_notes: item.request_notes})}
      />
    )
  }

  _pendingHeader() {
    return (
      <View style={styles.container}>
        <Text style={{color:"white", fontWeight:"bold"}}>In Progress</Text>
      </View>
    )
  }

  _closedHeader() {
    return (
      <View style={styles.container}>
        <Text style={{color:"white", fontWeight:"bold"}}>Completed</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.pending}
          keyExtractor={item => item.request_id}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._pendingHeader}
          // renderItem={({ item }) => (
          //   <ListItem
          //     // title={`${item.request_id} ${item.request_url}`}
          //     // subtitle={item.request_id}
          //     // avatar={{ uri: item.picture.thumbnail }}
          //   />
          // )}
        />
        <FlatList
          data={this.props.closed}
          keyExtractor={item => item.request_id}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._closedHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(YourLessonsScreen);
