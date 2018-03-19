import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import * as Actions from '../actions/actions.js';
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
import ResetPasswordScreen from '../screens/ResetPasswordScreen.js';
import CreateAccountScreen from '../screens/CreateAccountScreen.js';
import CameraScreen from '../screens/CameraScreen.js';
import LogoutScreen from '../screens/LogoutScreen.js';
import PendingLessonsScreen from '../screens/PendingLessonsScreen.js';
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

//lists all navigation details for the app
export const AppNavigator = DrawerNavigator(
  {
      Login: {
          screen: LoginScreen,
            navigationOptions: true ? {
                drawerLabel: () => null //prevents this element from showing in the drawer if we are logged in
            } : {}
          },
      ResetPassword: {
        screen: StackNavigator({
          ResetPassword: {
            screen: ResetPasswordScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Password Reset',
                drawerLabel: () => null,
                headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBeforeGrey} onPress={ () => navigation.navigate('Login')}/>
            })
          }
        })
      },
      CreateAccount: {
        screen: StackNavigator({
          CreateAccount: {
            screen: CreateAccountScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Create Account',
                drawerLabel: () => null,
                headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBeforeGrey} onPress={ () => navigation.navigate('Login')}/>
            })
          }
        })
      },
      Home: {
          screen: StackNavigator({
              Home: {
                  screen: HomeScreen,
                  navigationOptions:({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>,
                      // headerRight: <MaterialIcons name="clear" size={30} style={{paddingRight: 10, color: 'white'}} onPress={ () => this.props.logout())}/>
                      //<Text style={{color: 'white', paddingRight: 10, fontWeight: 'bold'}}>Logout</Text>
                    })
              }
            }),
            navigationOptions:{
              drawerLabel: <Text style={{color:"#231f61",
                            flexDirection: 'row',
                            flex: 1,
                            opacity:.8,
                            fontSize: 18,
                            paddingLeft:20,
                            paddingTop:10,
                            paddingBottom:10,
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            borderWidth: .5,
                            borderColor: '#c1c1c1'}}>Home</Text>,
            }
          },
      // Each page that has several pages that you can step through is rendered as a StackNavigator
      // Stack Navigator gives you a header component for free, we inject an icon there to open the drawer
      Camera: {
        screen: StackNavigator({
          Camera: {
            screen: CameraScreen,
            navigationOptions: ({ navigation }) => ({
                title: (
                  <Image source={require('./img/SELogo-12.png')} />
                ),
                headerStyle: styles.header,
                drawerLabel: () => null,
                headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBefore} onPress={ () => navigation.navigate('RedeemLessons')}/>
            })
          }
        })
      },
      YourLessons: {
          screen: StackNavigator({
              YourLessons: {
                  screen: YourLessonsScreen,
                  navigationOptions:({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
              IndividualLessonsScreen: {
                  screen: IndividualLessonsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBefore} onPress={ () => navigation.navigate('YourLessons')}/>
                  })
              }
          },{
              initialRouteName: 'YourLessons',
              contentOptions:{activeTintColor: '#231f61', opacity:.8}
          }),
          navigationOptions:{
              drawerLabel: <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>Your Lessons</Text>
          }
      },
      RedeemLessons: {
          screen: StackNavigator({
              RedeemLessons: {
                  screen: RedeemLessonsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
          },{
              initialRouteName: 'RedeemLessons',
              contentOptions:{activeTintColor: '#231f61', opacity:.8}
          }),
          navigationOptions:{
              drawerLabel: <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>Redeem Lessons</Text>
          }
      },
      PendingLessons: {
        screen: StackNavigator({
          PendingLessons: {
            screen: PendingLessonsScreen,
            navigationOptions: ({ navigation }) => ({
                title: (
                  <Image source={require('./img/SELogo-12.png')} />
                ),
                headerStyle: styles.header,
                drawerLabel: () => null,
                headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBefore} onPress={ () => navigation.navigate('Home')}/>
            })
          }
        },{
            initialRouteName: 'PendingLessons',
            contentOptions:{activeTintColor: '#231f61', opacity:.8}
        })
      },
      OrderLessons: {
          screen: StackNavigator({
              OrderLessons: {
                  screen: OrderLessonsScreen,
                  navigationOptions:({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>
                  })
              },
              OrderDetailsScreen: {
                  screen: OrderDetailsScreen,
                  navigationOptions: ({ navigation }) => ({
                      title: (
                        <Image source={require('./img/SELogo-12.png')} />
                      ),
                      headerStyle: styles.header,
                      headerLeft: <MaterialIcons name="navigate-before" size={30} style={styles.navigateBefore} onPress={ () => navigation.navigate('OrderLessons')}/>
                  })
              }
          }),
          navigationOptions:{
              drawerLabel: <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>Order Lessons</Text>
          }
      },
      // Solo screens don't get a header by default. We can add them in the Component definition (as I did here), or use the headerMode prop on the top-level Stack Navigator
      Help: {
          screen: StackNavigator({
            HelpScreen: {
              screen: HelpScreen,
              navigationOptions:({ navigation }) => ({
                  title: (
                    <Image source={require('./img/SELogo-12.png')} />
                  ),
                  headerStyle: styles.header,
                  headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>
              })
            }
          }),
          navigationOptions: {
              drawerLabel: <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>Help</Text>
          }
      },
      About: {
          screen: StackNavigator({
            AboutScreen: {
              screen: AboutScreen,
              navigationOptions:({ navigation }) => ({
                  title: (
                    <Image source={require('./img/SELogo-12.png')} />
                  ),
                  headerStyle: styles.header,
                  headerLeft: <MaterialIcons name="dehaze" size={30} style={styles.dehaze} onPress={ () => navigation.navigate('DrawerOpen')}/>
              })
            }
          }),
          navigationOptions: {
              drawerLabel: <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>About</Text>,
          }
      },
      // Settings: {
      //     screen: StackNavigator({
      //       SettingsScreen: {
      //         screen: SettingsScreen,
      //         navigationOptions:({ navigation }) => ({
      //             title: (
      //               <Image source={require('./img/SELogo-12.png')} />
      //             ),
      //             headerStyle: {backgroundColor: '#231f61'},
      //             headerLeft: <MaterialIcons name="dehaze" size={30} style={{ color: 'white' }} onPress={ () => navigation.navigate('DrawerOpen')}/>
      //         })
      //       },
      //       UserData: {
      //           screen: UserData,
      //           navigationOptions: ({ navigation }) => ({
      //               title: (
      //                 <Image source={require('./img/SELogo-12.png')} />
      //               ),
      //               headerStyle: {backgroundColor: '#231f61'},
      //               headerLeft: <MaterialIcons name="navigate-before" size={30} style={{ color: 'white' }} onPress={ () => navigation.navigate('SettingsScreen')}/>
      //           })
      //       },
      //       CameraData: {
      //           screen: CameraData,
      //           navigationOptions: ({ navigation }) => ({
      //               title: (
      //                 <Image source={require('./img/SELogo-12.png')} />
      //               ),
      //               headerStyle: {backgroundColor: '#231f61'},
      //               headerLeft: <MaterialIcons name="navigate-before" size={30} style={{ color: 'white' }} onPress={ () => navigation.navigate('SettingsScreen')}/>
      //           })
      //       },
      //     }),
      //     navigationOptions: {
      //         drawerLabel: <Text style={{color:"#231f61",
      //         opacity:.8,
      //         fontSize: 18,
      //         paddingLeft:20,
      //         paddingTop:10,
      //         paddingBottom:10,
      //         fontWeight: 'bold',
      //         borderWidth: .5,
      //         borderColor: '#c1c1c1',}}>Settings</Text>
      //         // drawerIcon: <MaterialIcons name="move-to-inbox" size={24} style={{ color: '#e91e63' }}/>
      //     }
      // },
      Logout: {
          screen: LogoutScreen,
          navigationOptions: {
              drawerLabel:  <Text style={{color:"#231f61",
              opacity:.8,
              flexDirection: 'row',
              flex: 1,
              fontSize: 18,
              paddingLeft:20,
              paddingTop:10,
              paddingBottom:10,
              backgroundColor: 'white',
              fontWeight: 'bold',
              borderWidth: .5,
              borderColor: '#c1c1c1',}}>Logout</Text>,
          }
      }
  },
  {
      initialRouteName: 'Login',
      drawerBackgroundColor: '#dedfe0',//'#f0f0f0',
      contentOptions:{activeTintColor: '#231f61', opacity:.8},
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

const styles = StyleSheet.create({
  dehaze: {
    color: 'white',
    paddingLeft: 10
  },
  navigateBeforeGrey: {
    color: '#231f61',
    opacity:.8
  },
  navigateBefore: {
    color: 'white',
  },
  header: {
    backgroundColor: '#231f61',
    paddingTop: 20,
    paddingBottom: 30,
  }
});

export default connect(mapStateToProps)(AppWithNavigationState);
