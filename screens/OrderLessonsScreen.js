import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

function mapStateToProps(state){
    return {
        packages: state.packages,
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class OrderLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          packages: this.props.packages,
      }
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        rightTitle={item.price}
        // onPress={ () => this._requestID({request_id: item.request_id, request_date: item.request_date, request_url: item.request_url})}
      />
    )
  }

  render() {
    console.log(this.props.packages.packages)
    return (
      <View>
        <View style={styles.title}>
          <Text>Order a lesson</Text>
          <Text>3 packages available</Text>
        </View>

        <FlatList
          data={this.props.packages.packages}
          keyExtractor={item => item.count}
          renderItem={this._renderItem.bind(this)}
          // ListHeaderComponent={this._closedHeader}
        />
      </View>
    );
  }
}

// <Button
//   large
//   iconRight={{name: 'chevron-right', color: 'black', size: 40}}
//   buttonStyle={styles.button1}
//   raised
//   title="Par: 1 Lesson $14.99"
//   onPress={() =>  this.props.navigation.navigate('OrderDetailsScreen')}
// />
// <Button
//   large
//   iconRight={{name: 'chevron-right', color: 'black', size: 40}}
//   buttonStyle={styles.button2}
//   raised
//   title="Eagle: 5 Lessons $39.99"
//   onPress={() =>  this.props.navigation.navigate('OrderDetailsScreen')}
// />
// <Button
//   large
//   iconRight={{name: 'chevron-right', color: 'black', size: 40}}
//   buttonStyle={styles.button3}
//   raised
//   title="Albatrose: Unlimited $59.99"
//   onPress={() =>  this.props.navigation.navigate('OrderDetailsScreen')}
// />

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    width: 400,
    height: 120,
    alignItems: 'center',
  },
  button1: {
    width: 400,
    height: 120,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button2: {
    width: 400,
    height: 120,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button3: {
    width: 400,
    height: 120,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
