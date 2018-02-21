import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

function mapStateToProps(state){
    return {
        handedness: state.settings.handedness,
        duration: state.settings.camera.duration,
        delay: state.settings.camera.delay,
        overlay: state.settings.camera.overlay,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

const list = [
  {
    title: 'User Data',
    page: 'UserData',
  },
  {
    title: 'Camera Data',
    page: 'CameraData'
  },
]

class SettingsScreen extends Component {
  render() {
    return (
      <List>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              titleStyle = {styles.listItemTitle}
              onPress={() =>  this.props.navigation.navigate(item.page)}
            />
          ))
        }
      </List>
    );
  }
}

const styles = StyleSheet.create({
  listItemTitle: {
    fontSize: 18,
    borderBottomColor: '#c1c1c1',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
