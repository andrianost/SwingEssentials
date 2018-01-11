import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Routes from '../config/navigationRoutes.js';
import HomeScreen from '../screens/HomeScreen.js';
import YourLessonsScreen from '../screens/YourLessonsScreen.js';
import RedeemLessonsScreen from '../screens/RedeemLessonsScreen.js';
import OrderLessonsScreen from '../screens/OrderLessonsScreen.js';
import AboutScreen from '../screens/AboutScreen.js';
import HelpScreen from '../screens/HelpScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import UserData from '../screens/UserData.js';
import CameraData from '../screens/CameraData.js';
import IndividualLessonsScreen from '../screens/IndividualLessonsScreen.js';
import OrderDetailsScreen from '../screens/OrderDetailsScreen.js';

import CustomDrawer from '../screens/CustomDrawer.js';

function mapStateToProps(state){
    return {
        username: state.userData.username,
        firstName: state.userData.firstName
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
}

export const AppNavigator = DrawerNavigator(
  {
      Login: {
          screen: LoginScreen,
          navigationOptions: true ? {
              drawerLabel: () => null //prevents this element from showing in the drawer if we are logged in
          } : {}
      },
      Home: {
          screen: StackNavigator({
              Home: {
                  screen: HomeScreen,
                  navigationOptions:({ navigation }) => ({
                      title: 'Home',
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>                  })
              }
            }),
            navigationOptions:{
                drawerLabel: 'Home',
                // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#231f61' }}/>
            }
          },
      // Each page that has several pages that you can step through is rendered as a StackNavigator
      // Stack Navigator gives you a header component for free, we inject an icon there to open the drawer
      YourLessons: {
          screen: StackNavigator({
              YourLessons: {
                  screen: YourLessonsScreen,
                  navigationOptions:({ navigation }) => ({
                      title: 'Your Lessons',
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
              IndividualLessonsScreen: {
                  screen: IndividualLessonsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: 'Lessons Screen',
                      headerLeft: <MaterialIcons name="navigate-before" size={24} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('YourLessons')}/>
                  })
              }
          },{
              initialRouteName: 'YourLessons',
              contentOptions:{activeTintColor: '#231f61'}
          }),
          navigationOptions:{
              drawerLabel: 'Your Lessons',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      RedeemLessons: {
          screen: StackNavigator({
              RedeemLessons: {
                  screen: RedeemLessonsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: 'Redeem Lessons',
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
          },{
              initialRouteName: 'RedeemLessons',
              contentOptions:{activeTintColor: '#231f61'}
          }),
          navigationOptions:{
              drawerLabel: 'Redeem Lessons',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      OrderLessons: {
          screen: StackNavigator({
              OrderLessons: {
                  screen: OrderLessonsScreen,
                  navigationOptions:({ navigation }) => ({
                      title: 'Select a Package',
                      headerLeft: <MaterialIcons name="dehaze" size={24} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
              OrderDetailsScreen: {
                  screen: OrderDetailsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: 'Order Details',
                      headerLeft: <MaterialIcons name="navigate-before" size={24} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('OrderLessons')}/>
                  })
              }
          }),
          navigationOptions:{
              drawerLabel: 'Order Lessons',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      // Solo screens don't get a header by default. We can add them in the Component definition (as I did here), or use the headerMode prop on the top-level Stack Navigator
      Help: {
          screen: StackNavigator({
            HelpScreen: {
              screen: HelpScreen,
              navigationOptions:({ navigation }) => ({
                  title: 'Help',
                  headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
              })
            }
          }),
          navigationOptions: {
              drawerLabel: 'Help',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      About: {
          screen: StackNavigator({
            AboutScreen: {
              screen: AboutScreen,
              navigationOptions:({ navigation }) => ({
                  title: 'About',
                  headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
              })
            }
          }),
          navigationOptions: {
              drawerLabel: 'About',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      Settings: {
          screen: StackNavigator({
            SettingsScreen: {
              screen: SettingsScreen,
              navigationOptions:({ navigation }) => ({
                  title: 'Settings',
                  headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
              })
            },
            UserData: {
                screen: UserData,
                navigationOptions: ({ navigation }) => ({
                    title: 'User Data',
                    headerLeft: <MaterialIcons name="navigate-before" size={24} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('SettingsScreen')}/>
                })
            },
            CameraData: {
                screen: CameraData,
                navigationOptions: ({ navigation }) => ({
                    title: 'Camera Data',
                    headerLeft: <MaterialIcons name="navigate-before" size={24} style={{ color: '#231f61' }} onPress={ () => navigation.navigate('SettingsScreen')}/>
                })
            },
          }),
          navigationOptions: {
              drawerLabel: 'Settings',
              // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
          }
      },
      // Logout: {
      //     screen: Logout,
      //     path: '/logout',
      //     navigationOptions: {
      //         drawerLabel: 'Sign Out',
      //         drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
      //     }
      // }
  },
  {
      initialRouteName: 'Login',
      drawerBackgroundColor: '#f2f2f2',
      contentOptions:{activeTintColor: '#231f61'},
      contentComponent: CustomDrawer
  },
);

class AppWithNavigationState extends React.Component {
    render(){
        return(
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
