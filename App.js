import React from 'react';
import {store} from './store/store.js';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import AppWithNavigationState from './navigators/AppNavigator.js';
import MapView from './screens/MapView.js';


class SwingEssentialsApp extends React.Component {
  // render() {
  //   return <MapView style={{flex: 1}} />;
  // }
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
