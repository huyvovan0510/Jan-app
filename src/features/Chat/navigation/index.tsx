import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RoomData} from '../chat.interface';
import ConversationScreen from '../screens/ConversationScreen';

const Stack = createNativeStackNavigator();

export default function ChatNavigationGroup() {
  return (
    <Stack.Group>
      <Stack.Screen
        key={'ConversationScreen'}
        name={'ConversationScreen'}
        component={ConversationScreen}
      />
    </Stack.Group>
  );
}

export type ChatNavigationParamsList = {
  ['ConversationScreen']: {roomData?: RoomData};
};
