import { createRef } from 'react';
import {
  ParamListBase,
  NavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = (name: string, params?: ParamListBase): void => {
  return navigationRef?.current?.navigate(name, params);
};
