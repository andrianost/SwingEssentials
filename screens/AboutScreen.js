import React from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import {FormLabel, Header} from 'react-native-elements';
import styles, {colors, spacing, altStyles} from '../index.js';

function mapStateToProps(state){
  return {
    token: state.login.token
  };
}
function mapDispatchToProps(dispatch){
  return {};
}

class AboutScreen extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(!this.props.token){
        this.props.navigation.navigate('Login');
    }
  }
  componentWillReceiveProps(nextProps){
      if(!nextProps.token){
          this.props.navigation.navigate('Login');
      }
  }

  render(){
    return (
      <View>
        <ScrollView contentContainerStyle={{padding: spacing.normal, alignItems: 'stretch'}}>
          <Text style={styles.headline}>What is Swing Essentials?</Text>
          <FormLabel
            containerStyle={StyleSheet.flatten([styles.formLabelContainer, {marginTop: spacing.normal, marginBottom: spacing.small}])}
            labelStyle={StyleSheet.flatten([styles.formLabel])}>
            Lessons On Your Schedule
          </FormLabel>
          <Text style={styles.paragraph}>Swing Essentials provides you with affordable, individualized one-on-one lessons from a PGA-certified golf pro from the comfort and convenience of your home.</Text>
          <FormLabel
            containerStyle={StyleSheet.flatten([styles.formLabelContainer, {marginTop: spacing.normal, marginBottom: spacing.small}])}
            labelStyle={StyleSheet.flatten([styles.formLabel])}>
            How It Works
          </FormLabel>
          <Text style={styles.paragraph}>1) Open the Swing Essentials app and snap a short video of your swing using your camera.</Text>
          <Text style={styles.paragraph}>2) Preview your swing and when you’re ready, submit your videos for professional analysis.</Text>
          <Text style={styles.paragraph}>3) Within 48 hours, you will receive a personalized video highlighting what you’re doing well plus areas of your swing that could be improved.</Text>
          <FormLabel
            containerStyle={StyleSheet.flatten([styles.formLabelContainer, {marginTop: spacing.normal, marginBottom: spacing.small}])}
            labelStyle={StyleSheet.flatten([styles.formLabel])}>
            Why Swing Essentials
          </FormLabel>
          <Text style={styles.paragraph}>Swing Essentials offers a true one-on-one experience. Our PGA-certified professional puts a personal touch on each and every lesson, giving you the confidence to know that your lesson is just for you. But don’t take our word for it - hear what our customers have to say.</Text>
          <FormLabel
            containerStyle={StyleSheet.flatten([styles.formLabelContainer, {marginTop: spacing.normal, marginBottom: spacing.small}])}
            labelStyle={StyleSheet.flatten([styles.formLabel])}>
            Testimonials
          </FormLabel>
          <Text style={styles.paragraph}>"Thanks for the great work this last year. After working with you, I've lowered my handicap by three and a half."</Text>
          <Text style={StyleSheet.flatten([styles.paragraph, {fontWeight:'bold'}])}>- David A.</Text>
          <Text style={StyleSheet.flatten([styles.paragraph, {marginTop:spacing.normal}])}>"I sent my swing in to Swing Essentials and I'm playing so much better - it's easily taken four to five shots off my game. I strongly recommend it!"</Text>
          <Text style={StyleSheet.flatten([styles.paragraph, {fontWeight:'bold'}])}>- Dean L.</Text>
          <Text style={StyleSheet.flatten([styles.paragraph, {marginTop:spacing.normal}])}>"Thanks to you, I have been playing my best golf. It's all finally clicking now!"</Text>
          <Text style={StyleSheet.flatten([styles.paragraph, {fontWeight:'bold'}])}>- Will M.</Text>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
