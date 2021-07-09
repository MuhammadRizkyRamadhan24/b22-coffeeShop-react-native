/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import reduxConfig from './src/redux/store';
// import {PersistGate} from 'redux-persist/integration/react';

// const redux = reduxConfig();

const Main = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={redux.persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
