import React from 'react';
import {store} from './store/store.js';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppWithNavigationState from './navigators/AppNavigator.js';

class SwingEssentialsApp extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  
  render(){
    return(
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SwingEssentials', () => SwingEssentialsApp);

export default SwingEssentialsApp;
