import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import * as RNIap from 'react-native-iap';

import { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Platform } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

function mapStateToProps(state){
    return {
        packages: state.packages,
        name: state.packages.name,
        description: state.packages.description,
        price: state.packages.price,
        shortcode: state.packages.shortcode,
        token: state.login.token,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

const itemSkus = Platform.select({
  ios: [
    'com.swingessentials.par', 'com.swingessentials.eagle', 'com.swingessentials.albatross1'
  ],
  android: [
    'com.swingessentials.par', 'com.swingessentials.eagle', 'com.swingessentials.albatross1'
  ]
});

class OrderLessonsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          packages: this.props.packages,
          name: this.props.name,
          description: this.props.description,
          price: this.props.price,
          shortcode: this.props.shortcode,
          receipt: ''
      }
  }

  componentWillMount() {
    let skus = [];
    for (let i = 0; i < this.props.packages.packages.length; i++){
      skus.push(this.props.packages.packages[i].ios_sku);
    }
    this.skus = skus;
  }

  componentDidMount() {
      console.log('this skus', this.skus);
      try {
        RNIap.prepare()
        .then(() => {
          RNIap.getProducts(this.skus)
          .then((products) => {
            console.log('products', products);
          })
        })
        .catch((error) => console.log(error));
        }
        catch(err) {
          alert(err.message);
      }
    }
      // const products = await RNIap.getProducts([
      //   'com.swingessentials.par', 'com.swingessentials.eagle', 'com.swingessentials.albatross1'
      // ]);
      // this.setState({ productList: products });
      // console.log(itemSkus);
      // console.log('Products', products);
    // } catch(err) {
    //   console.warn(err); // standardized err.code and err.message available
    // }

  // _orderLessons(data){
  //   console.log('data')
  //   console.log(data)
  //   this.props.orderLessons(data)
  //   this.props.navigation.navigate('OrderDetailsScreen')
  // }

  _purchase(item){
    // console.log('sku', sku)
    RNIap.buyProduct(item.ios_sku)
    .then((purchase) => {alert('success'); this.props.submitOrder({package: item.shortcode, receipt: purchase.transactionReceipt, token: this.props.token})})
    .catch((error) => console.log(error));
    // console.log('purchase', purchase)
  }

  _packagesHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Available Packages</Text>
      </View>
    )
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        containerStyle = {styles.listItemContainer}
        titleStyle = {styles.listItemTitle}
        rightTitleStyle = {styles.listItemRightTitle}
        key={index}
        title={item.name}
        subtitle={item.description}
        subtitleStyle={styles.subtitle}
        rightTitle={item.ios_price}
        onPress={ () => this._purchase(item) }//this._orderLessons({name: item.name, description: item.description, price: item.price, shortcode: item.shortcode})}
      />
    )
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <FlatList
          data={this.props.packages.packages}
          keyExtractor={item => item.count}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._packagesHeader}
          scrollEnabled={false}
        />
      </View>
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
  text: {
    paddingLeft: 18,
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  listItemContainer: {
    height: 80,
    justifyContent: 'center',
    borderBottomColor: '#c1c1c1',
  },
  listItemTitle: {
    fontSize: 16,
    color: '#231f61',
    // opacity:.8
  },
  listItemRightTitle: {
    fontWeight: 'bold',
    color: '#231f61'
  },
  subtitle: {
    color: '#231f61',
    opacity:.8,
    fontSize: 13,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
