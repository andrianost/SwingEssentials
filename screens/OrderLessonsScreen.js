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
          receipt: '',
          products: []
      }
  }

  componentWillMount() {
    console.log('packages', this.props.packages.packages)
    let skus = [];
    for (let i = 0; i < this.props.packages.packages.length; i++){
      skus.push(this.props.packages.packages[i].app_sku);
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
            this.setState({products: products.sort((a,b) => {
              return parseInt(a.price, 10) - parseInt(b.price,10);
              }
            )});
          })
        })
        .catch((error) => console.log(error));
        }
        catch(err) {
          alert(err.message);
      }
    }

  componentWillUnMount(){
    void endConnection ();
  }

  _purchase(item){
    RNIap.buyProduct(item.app_sku)
    .then((purchase) => {this.props.submitOrder({package: item.shortcode, receipt: purchase.transactionReceipt, token: this.props.token, platform: Platform.OS});
                         RNIap.consumePurchase(purchase.transactionReceipt);
                         this.props.navigation.navigate('Home');
                        })
    .catch((error) => console.log(error));
  }

  _packagesHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Available Packages</Text>
      </View>
    )
  }

  // _renderItem({ item, index }) {
  //   console.log('render item')
  //   console.log(this.state)
  //   return (
  //     <ListItem
  //       containerStyle = {styles.listItemContainer}
  //       titleStyle = {styles.listItemTitle}
  //       rightTitleStyle = {styles.listItemRightTitle}
  //       key={index}
  //       title={item.name}
  //       subtitle={item.description}
  //       subtitleStyle={styles.subtitle}
  //       rightTitle={this.state.products.length > 0 ? this.state.products[index].price : '--'}
  //       onPress={ () => this._purchase(item) }
  //     />
  //   )
  // }

  render() {
    // console.log('this.state', this.state)
    return (
      <View style={styles.topContainer}>
        <FlatList
          data={this.props.packages.packages}
          extraData={this.state.products}
          keyExtractor={item => item.count}
          renderItem={({item, index}) =>
                      <ListItem
                          containerStyle = {styles.listItemContainer}
                          titleStyle = {styles.listItemTitle}
                          rightTitleStyle = {styles.listItemRightTitle}
                          key={index}
                          title={item.name}
                          subtitle={item.description}
                          subtitleStyle={styles.subtitle}
                          rightTitle={this.state.products.length > 0 ? this.state.products[index].price : '--'}
                          onPress={ () => this._purchase(item) }
                      />
                    }
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
    fontSize: 13,
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
    fontSize: 11,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLessonsScreen);
