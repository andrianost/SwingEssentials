import {DrawerNavigator} from 'react-navigation';

import YourLessonsScreen from '../screens/YourLessonsScreen';
import RedeemLessonsScreen from '../screens/RedeemLessonsScreen';
import OrderLessonsScreen from '../screens/OrderLessonsScreen';
import AboutScreen from '../screens/AboutScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

// const DrawerContent = (props) => {
//   console.log(props);
//   return (
//   <View>
//     <View
//       style={{
//         backgroundColor: '#f50057',
//         height: 140,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Text style={{ color: 'white', fontSize: 30 }}>
//         Header
//       </Text>
//       <Text>{this.props.username}</Text>
//     </View>
//     <DrawerItems {...props} />
//   </View>
// )}
const AppRoutes = DrawerNavigator({
  Home: { screen: HomeScreen },
  YourLessonsScreen: { screen: YourLessonsScreen },
  RedeemLessonsScreen: { screen: RedeemLessonsScreen },
  OrderLessonsScreen: { screen: OrderLessonsScreen },
  HelpScreen: { screen: HelpScreen },
  AboutScreen: { screen: AboutScreen },
  SettingsScreen: { screen: SettingsScreen }
}, {initialRouteName: 'Home'});

const Routes = {
  Login: { screen: LoginScreen },
  App: {screen: AppRoutes}
};


export default Routes;
