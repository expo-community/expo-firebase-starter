import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, SignupScreen, ForgotPasswordScreen } from '../screens';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: true, headerLargeTitle: true }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
