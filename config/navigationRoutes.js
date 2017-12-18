import {DrawerNavigator} from 'react-navigation';

import YourLessonsScreen from '../screens/YourLessonsScreen';
import RedeemLessonsScreen from '../screens/RedeemLessonsScreen';
import OrderLessonsScreen from '../screens/OrderLessonsScreen';
import AboutScreen from '../screens/AboutScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import IndividualLessonsScreen from '../screens/IndividualLessonsScreen';

const AppRoutes = DrawerNavigator({
  Home: { screen: HomeScreen },
  YourLessonsScreen: { screen: YourLessonsScreen },
  RedeemLessonsScreen: { screen: RedeemLessonsScreen },
  OrderLessonsScreen: { screen: OrderLessonsScreen },
  HelpScreen: { screen: HelpScreen },
  AboutScreen: { screen: AboutScreen },
  SettingsScreen: { screen: SettingsScreen },
  IndividualLessonsScreen: { screen: IndividualLessonsScreen }
}, {initialRouteName: 'Home'});

const Routes = {
  Login: { screen: LoginScreen },
  App: {screen: AppRoutes}
};


export default Routes;
