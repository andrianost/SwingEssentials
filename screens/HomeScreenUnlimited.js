import React from 'react';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import { Component } from 'react';
import { StyleSheet, Image, View, Text, Alert, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Button, FormInput, FormLabel, List, ListItem } from 'react-native-elements';

function mapStateToProps(state){
    return {
      token: state.login.token,
      pending: state.lessons.pending,
      closed: state.lessons.closed,
      request_id: state.lessons.request_id,
      request_date: state.lessons.request_date,
      request_url: state.lessons.request_url,
      request_notes: state.lessons.request_notes,
      response_notes: state.lessons.response_notes,
      response_video: state.lessons.response_video,
      credit_count: state.credits.count,
      credit_unlimited_count: state.credits.unlimited_count,
      credit_details: state.credits.details,
      credit_unlimited_expires: state.credits.unlimited_expires,
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

class HomeScreenUnlimited extends Component {
  constructor(props){
      super(props);
      this.state = {
        bearerToken: this.props.token,
        pending: this.props.pending,
        closed: this.props.closed,
        request_id: this.props.request_id,
        request_date: this.props.request_date,
        request_url: this.props.request_url,
        request_notes: this.props.request_notes,
        response_notes: this.props.response_notes,
        viewed: this.props.viewed,
        response_video: this.props.response_video,
        credit_count: this.props.credit_count,
        credit_unlimited_count: this.props.credit_unlimited_count,
        credit_details: this.props.credit_details,
        credit_unlimited_expires: this.props.unlimited_expires,
        successModalVisible: false,
        timeRemaining: '',
      }
  }

  async componentWillMount() {
    await this.setState({timeRemaining: Math.ceil(((this.props.credit_unlimited_expires - Date.now()/1000)/86400))});
    // console.log('time remaining')
    // console.log(this.state.timeRemaining)
  }

  _recentLessonsHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Recent Lessons</Text>
      </View>
    )
  }

  _availableCreditsHeader() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Unlimited Lessons</Text>
      </View>
    )
  }

  _requestID(data){
    this.props.setRequestId(data)
    this.props.navigation.navigate('IndividualLessonsScreen')
  }

  _updateViewedStatus(data){
    this.props.updateViewedStatus(data)
  }

  _renderItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.request_date}
        titleStyle = {styles.listItemTitle}
        rightTitle={(item.viewed===0)?'NEW!':null}
        rightTitleStyle = {styles.listItemRightTitle}
        onPress={ () => {this._requestID({request_id: item.request_id,
                                          request_date: item.request_date,
                                          request_url: item.request_url,
                                          request_notes: item.request_notes,
                                          response_notes: item.response_notes,
                                          response_video: item.response_video});
                        this._updateViewedStatus({request_id: item.request_id, bearerToken: this.props.token});}}
      />
    )
  }

  _renderCreditItem({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.key}
        titleStyle = {styles.listItemTitle}
        rightTitle={item.value?item.value+'':'-'}
        rightTitleStyle = {styles.listItemCreditRightTitle}
        disabled={true}
        onPress={ () => this.props.navigation.navigate('RedeemLessons')}
      />
    )
  }

  _timeRemaining(){
    if (!this.props.credit_unlimited_expires){
      return '--';
    }
    var time = Math.ceil((this.props.credit_unlimited_expires - Date.now()/1000)/86400);
    if (time > 0){
      return time + ' days left';
    }
  }

  _renderUnlimitedCredit({ item, index }) {
    return (
      <ListItem
        key={index}
        title={item.key}
        titleStyle = {styles.listItemTitle}
        rightTitle={this._timeRemaining()}
        // rightTitle={this.state.timeRemaining + ' days remaining'}
        onPress={ () => this.props.navigation.navigate('RedeemLessons')}
      />
    )
  }

  _emptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyContainerTitle}>You have no active lessons</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.topContainer}>
        <FlatList
          data={this.props.closed.slice(0,2)}
          keyExtractor={item => item.request_id}
          renderItem={this._renderItem.bind(this)}
          ListHeaderComponent={this._recentLessonsHeader}
          ListEmptyComponent={this._emptyComponent}
          scrollEnabled={false}
        />
        <FlatList
          data = {[{key:'Individual Lessons', value: this.props.credit_count}, {key:'Unlimited Lessons', value: this.props.credit_unlimited_count}]}
          keyExtractor={item => item.key}
          renderItem={this._renderCreditItem.bind(this)}
          ListHeaderComponent={this._availableCreditsHeader}
          ListEmptyComponent={this._emptyComponent}
          scrollEnabled={false}
        />
        <FlatList
          data = { [{key: 'Submit a Swing', value: ''}] }
          keyExtractor={item => item.key}
          renderItem={this._renderUnlimitedCredit.bind(this)}
          scrollEnabled={false}
        />
        <Modal animationType="slide" transparent={true} visible={this.state.successModalVisible}>
          <View style={styles.successModal}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>Activating your unlimited lessons deal will give you access to unlimited lessons for 30 days. Would you like to proceed?</Text>
              <TouchableOpacity onPress={() => this.setState({successModalVisible: false})}>
                <Text style={styles.modalTopButtonText}>Yes</Text>
              </TouchableOpacity>
              <View style={styles.modalBorder}>
              </View>
              <TouchableOpacity onPress={() => this.setState({successModalVisible: false})}>
                <Text style={styles.modalBottomButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.buttonContainer}>
          <Button
            raised
            title="ORDER LESSONS"
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('OrderLessons')}
          />
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#231f61',
    opacity:.8,
  },
  text: {
    paddingLeft: 19,
    fontSize: 18,
    color:"white",
    fontWeight:"bold"
  },
  listItemTitle: {
    color:"#231f61",
    opacity:.8,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomColor: '#c1c1c1',
  },
  listItemRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  },
  listItemCreditRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#231f61",
    opacity:.8,
  },
  button: {
    backgroundColor: '#231f61',
    opacity:.8
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  emptyContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    opacity:.8
  },
  emptyContainerTitle: {
    color:"#231f61",
    opacity:.8,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: '#c1c1c1',
    paddingLeft: 15,
  },
  successModal: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalButton: {
   alignItems: 'stretch',
   backgroundColor: 'white',
   padding: 20,
 },
 modalText: {
   paddingLeft: 18,
   paddingBottom: 15,
   color: '#231f61',
   alignItems: 'center'
 },
 modalBottomButtonText: {
   paddingTop: 15,
   color: '#231f61',
   alignItems: 'center'
 },
 modalTopButtonText: {
   paddingBottom: 15,
   color: '#231f61',
   alignItems: 'center'
 },
 modalBorder: {
   borderBottomColor: '#231f61',
   borderWidth: .5,
   width: 300,
 },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenUnlimited);
