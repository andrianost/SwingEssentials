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
        name: state.packages.name,
        description: state.packages.description,
        price: state.packages.price
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
          name: this.props.name,
          description: this.props.description,
          price: this.props.price
      }
  }

  _orderLessons(data){
    this.props.orderLessons(data)
    this.props.navigation.navigate('OrderDetailsScreen')
  }

  _packagesHeader() {
    return (
      <View style={styles.container}>
        <Text style={{color:"white", fontWeight:"bold"}}>Available Packages</Text>
      </View>
    )
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        containerStyle = {{height: 80, justifyContent: 'center', backgroundColor: 'powderblue'}}
        titleStyle = {{fontSize: 18}}
        rightTitleStyle = {{fontWeight: 'bold', color: 'black'}}
        key={index}
        title={item.name}
        subtitle={item.description}
        rightTitle={item.price}
        onPress={ () => this._orderLessons({name: item.name, description: item.description, price: item.price})}
      />
    )
  }

  render() {
    // console.log(this.props.packages.packages)
    return (
      <View>
        <FlatList
          data={this.props.packages.packages}
          keyExtractor={item => item.count}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._packagesHeader}
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
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  title: {
    width: 400,
    height: 120,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
