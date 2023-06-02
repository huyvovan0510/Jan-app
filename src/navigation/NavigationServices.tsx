import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import React from 'react';
import {Keyboard} from 'react-native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  if (navigationRef?.current) {
    const navigateAction = StackActions?.push(name, params);
    navigationRef?.current?.dispatch(navigateAction);
  }
}

export function goBack() {
  if (navigationRef?.current) {
    Keyboard.dismiss();
    navigationRef?.current?.goBack();
  }
}
