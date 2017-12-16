import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
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
      }
  }

  _getLessons(){
    this.props.requestLessons({bearerToken: this.state.bearerToken});
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.request_date}
        subtitle={item.request_id}
      />
    )
  }

  _pendingHeader() {
    return (
      <Text>Pending</Text>
    )
  }

  _closedHeader() {
    return (
      <Text>Closed</Text>
    )
  }

  render() {
    return (
      <View>
        <Button
          title="Get Lessons"
          onPress={ () => this._getLessons()}
        />
        <FlatList
          data={this.props.pending}
          keyExtractor={item => item.request_id}
          renderItem={this._renderItem}
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
          renderItem={this._renderItem}
          ListHeaderComponent={this._closedHeader}
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

export default connect(mapStateToProps, mapDispatchToProps)(YourLessonsScreen);
