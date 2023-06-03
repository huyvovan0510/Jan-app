import {
  ChatSelectors,
  useShallowEqualSelector,
} from '@features/Chat/store/chat.selectors';
import RootNavigation from '@navigation/index';
import React from 'react';
import {LogBox} from 'react-native';
import Config from 'react-native-config';
import {Provider} from 'react-redux';
import {store} from './src/store';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};
export default App;
