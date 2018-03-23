import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import { NativeModules } from 'react-native';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';

function mapStateToProps(state){
    return {
      name: state.packages.name,
      description: state.packages.description,
      price: state.packages.price,
      discount: state.packages.discount,
      type: state.packages.type,
      value: state.packages.value,
      token: state.login.token,
      shortcode: state.packages.shortcode,
      response: state.packages.response.status,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class OrderDetailsScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
        name: this.props.name,
        description: this.props.description,
        price: this.props.price,
        discount: this.props.discount,
        type: this.props.type,
        value: this.props.value,
        bearerToken: this.props.token,
        shortcode: this.props.shortcode,
        response: this.props.response,
        coupon: false,
        savings: '',
        orderComplete: false,
        invalidDiscount: false,
      }
  }

  _onDiscount(){
      this.props.requestDiscount({discount: this.state.discount})
      .then(() => {
        if (this.props.type == 'percent') {
            this.setState({savings: ((parseFloat(this.props.value).toFixed(2)/100) * (parseFloat(this.props.price).toFixed(2)))});
            this.setState({price: ((parseFloat(this.props.price).toFixed(2) - ((parseFloat(this.props.value).toFixed(2)/100) * (parseFloat(this.props.price).toFixed(2)))))});
            this.setState({price: this.state.price.toFixed(2).toString()})
            this.props.updatePrice({price: this.props.price});
            this.setState({coupon: true});
            this.setState({invalidDiscount: false})
            this.props.discountSuccess({type: '', value: ''})
        } else if (this.props.type == 'amount') {
            this.setState({savings: parseFloat(this.props.value).toFixed(2)});
            this.props.updatePrice({price: (parseFloat(this.props.price).toFixed(2) - parseFloat(this.props.value).toFixed(2))});
            this.setState({coupon: true});
            this.setState({invalidDiscount: false})
            this.props.discountSuccess({type: '', value: ''})
        } else {
            this.setState({invalidDiscount: true})
        }
      })
  }

  _submitOrder(){
    this.props.submitOrder({bearerToken: this.state.bearerToken, shortcode: this.state.shortcode})
    .then(() => {
      if (this.props.response == 200) {
        this.setState({orderComplete: true});
      }
    })
  }

  _PayPal(){
  console.log('PayPal log')
  NativeModules.PayPal.buyAction(this.state.bearerToken, this.state.price, this.state.name, this.state.description,
                                this.state.shortcode, this.state.discount)
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Discount Code</Text>
        </View>
        <FormInput
            value={this.state.discount}
            placeholder="Please enter your discount code"
            onChangeText={(newText) => this.setState({discount: newText})}
        />
        {this.state.invalidDiscount == true && <FormValidationMessage>Invalid discount code</FormValidationMessage>}
        <View style={styles.buttonContainer}>
          <Button
              title="APPLY CODE"
              buttonStyle={styles.button}
              disabled={!this.state.discount || this.state.coupon == true}
              onPress={this._onDiscount.bind(this)}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Details:  {this.props.name}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerText}>Sub-total: ${parseFloat(this.props.price).toFixed(2)}</Text>
        </View>
        {this.state.coupon == true && <View style={styles.container}><Text style={styles.savingsText}>Savings: -${parseFloat(this.state.savings).toFixed(2)}</Text></View>}
        <View style={styles.container}>
          <Text style={styles.containerText}>Tax: $0.00</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerText}>Total: ${parseFloat(this.state.price).toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
              raised
              buttonStyle={styles.button}
              title="SUBMIT ORDER"
              disabled={this.state.orderComplete == true}
              onPress={this._PayPal.bind(this)}//{this._submitOrder.bind(this)}
          />
          {this.state.orderComplete == true && <FormValidationMessage>Your order has been completed!</FormValidationMessage>}
        </View>
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
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8,
    // height: 40,
    justifyContent: 'center'
  },
  containerText: {
    fontWeight: 'bold',
    color: '#231f61',
  },
  headerText: {
    paddingLeft: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  savingsText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#231f61',
    opacity:.8
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
