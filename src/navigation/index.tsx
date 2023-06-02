import ChatNavigationGroup from '@features/Chat/navigation';
import ChatScreen from '@features/Chat/screens/RoomsChatScreen';
import Discover from '@features/Discover';
import Models from '@features/Models';
import Profile from '@features/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {navigationRef} from './NavigationServices';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Models" component={Models} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTabNavigation} />
        {ChatNavigationGroup()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//
export default RootNavigation;
