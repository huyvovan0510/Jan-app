import RootNavigation from '@navigation/index';
import React from 'react';
import Config from 'react-native-config';

const App = () => {
  console.log(
    "\x1b[35;1m' ~ file: App.tsx:8 ~ Config?.CHAT_GPT_API_KEY:",
    Config?.CHAT_GPT_API_KEY,
  );

  return <RootNavigation />;
};
export default App;
