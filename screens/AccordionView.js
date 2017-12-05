import React from 'react';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

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

const SECTIONS = [
  {
    title: 'Swing',
    content: 'Handed ',
  },
  {
    title: 'Camera',
    content: 'Duration',
  }
];

class AccordionView extends Component {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title} </Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{this.props.handedness}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
      <Text>Handedness: {this.props.handedness}</Text>
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader.bind(this)}
        renderContent={this._renderContent.bind(this)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: 400,
    height: 120,
    backgroundColor: 'grey',
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  content: {
    width: 400,
    height: 120,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccordionView);
