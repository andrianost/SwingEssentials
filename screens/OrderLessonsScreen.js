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
        price: state.packages.price,
        shortcode: state.packages.shortcode,
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
          price: this.props.price,
          shortcode: this.props.shortcode,
      }
  }

  _orderLessons(data){
    console.log('data')
    console.log(data)
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
        containerStyle = {{height: 80, justifyContent: 'center'}}
        titleStyle = {{fontSize: 18}}
        rightTitleStyle = {{fontWeight: 'bold', color: 'black'}}
        key={index}
        title={item.name}
        subtitle={item.description}
        rightTitle={item.price}
        onPress={ () => this._orderLessons({name: item.name, description: item.description, price: item.price, shortcode: item.shortcode})}
      />
    )
  }

  render() {
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
