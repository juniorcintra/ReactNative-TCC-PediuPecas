/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducers from './src/redux/slices';

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import AuthNavigator from './src/navigation/AuthNavigator';
import Color from './src/assets/colors/Colors';
import {StatusBar} from 'react-native';
import {FullSreenContext} from './src/context/FullScreenContext';

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: [...getDefaultMiddleware(), thunk],
});

const App = () => {
  const [FullScreen, setFullScreen] = useState(false);
  return (
    <Provider store={store}>
      <FullSreenContext.Provider value={{FullScreen, setFullScreen}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.primary_default}
        />
        <AuthNavigator />
      </FullSreenContext.Provider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EBEBEB',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#ccc',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
