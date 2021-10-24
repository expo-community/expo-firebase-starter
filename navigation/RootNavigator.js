import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStack } from './AuthStack';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
