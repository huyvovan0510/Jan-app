import RootNavigation from '@navigation/index';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import Config from 'react-native-config';
import {Provider} from 'react-redux';
import {store} from './src/store';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

interface AppProps {
  data: {
    miniAppMode: boolean;
  };
}

const App = ({data}: AppProps) => {
  const {miniAppMode} = data || {};

  if (miniAppMode) {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
