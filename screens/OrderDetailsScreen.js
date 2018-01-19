import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements'

function mapStateToProps(state){
    return {
      name: state.packages.name,
      description: state.packages.description,
      price: state.packages.price,
      discount: state.packages.discount,
      type: state.packages.type,
      value: state.packages.value,
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
        coupon: false,
        savings: ''
      }
  }

  _onDiscount(){
      this.props.requestDiscount({discount: this.state.discount})
      .then(() => {
        if (this.props.type == 'percent') {
            this.setState({savings: ((parseInt(this.props.value)/100) * (parseInt(this.props.price)))})
            this.props.updatePrice({price: (parseInt(this.props.price) - ((parseInt(this.props.value)/100) * (parseInt(this.props.price))))});
            this.setState({coupon: true})
            console.log(typeof this.props.price)
        } else if (this.props.type == 'amount') {
            this.setState({savings: ((parseInt(this.props.value)/100) * (parseInt(this.props.price)))})
            this.props.updatePrice({price: (parseInt(this.props.price) - parseInt(this.props.value))});
            this.setState({coupon: true})
        } else {
            console.log('invalid code')
            this.props.discountSuccess({type: 'invalid'}) // create proper action and reducer..noob
        }
      })
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={{color:"white", fontWeight:"bold"}}>Discount Code</Text>
        </View>
        <FormInput
            value={this.state.discount}
            placeholder="Please enter your discount code"
            onChangeText={(newText) => this.setState({discount: newText})}
        />
        {this.props.type == 'invalid' && <FormValidationMessage>Invalid discount code</FormValidationMessage>}
        <View style={{paddingBottom:20}}>
          <Button
              raised
              title="Apply Code"
              disabled={!this.state.discount || this.state.coupon == true}
              onPress={this._onDiscount.bind(this)}
          />
        </View>
        <View style={styles.header}>
          <Text style={{color:"white", fontWeight:"bold"}}>Order Details:  {this.props.name}</Text>
        </View>
        <View style={styles.container}>
          <Text style={{fontWeight:"bold"}}>Sub-total:                                                        ${parseFloat(this.state.price).toFixed(2)}</Text>
        </View>
        {this.state.coupon == true && <View style={styles.container}><Text style={{fontWeight:"bold", fontStyle:"italic"}}>Savings: -${this.state.savings.toFixed(2)}</Text></View>}
        <View style={styles.container}>
          <Text style={{fontWeight:"bold"}}>Tax:                                                                     $0.00</Text>
        </View>
        <View style={styles.container}>
          <Text style={{fontWeight:"bold"}}>Total:                                                                ${parseFloat(this.props.price).toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
