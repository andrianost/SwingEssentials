import {DrawerNavigator} from 'react-navigation';

import YourLessonsScreen from '../screens/YourLessonsScreen.js';
import RedeemLessonsScreen from '../screens/RedeemLessonsScreen.js';
import OrderLessonsScreen from '../screens/OrderLessonsScreen.js';
import AboutScreen from '../screens/AboutScreen.js';
import HelpScreen from '../screens/HelpScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import HomeScreenUnlimited from '../screens/HomeScreenUnlimited.js';
import LoginScreen from '../screens/LoginScreen.js';
import IndividualLessonsScreen from '../screens/IndividualLessonsScreen.js';
import OrderDetailsScreen from '../screens/OrderDetailsScreen.js';
import CameraScreen from '../screens/CameraScreen.js';
import PendingLessonsScreen from '../screens/PendingLessonsScreen.js';

//configures navigation routes for the drawer nav after successful login
const AppRoutes = DrawerNavigator({
  Home: { screen: HomeScreen },
  HomeUnlimited: {screen: HomeScreenUnlimited },
  YourLessonsScreen: { screen: YourLessonsScreen },
  RedeemLessonsScreen: { screen: RedeemLessonsScreen },
  OrderLessonsScreen: { screen: OrderLessonsScreen },
  HelpScreen: { screen: HelpScreen },
  AboutScreen: { screen: AboutScreen },
  SettingsScreen: { screen: SettingsScreen },
  IndividualLessonsScreen: { screen: IndividualLessonsScreen },
  OrderDetailsScreen: { screen: OrderDetailsScreen },
  CameraScreen: { screen: CameraScreen },
  PendingLessons: { screen: PendingLessonsScreen },
}, {initialRouteName: 'Home'});

//configures the initial route upon app start and loads all drawer nav routes
const Routes = {
  Login: { screen: LoginScreen },
  App: {screen: AppRoutes}
};

export default Routes;
