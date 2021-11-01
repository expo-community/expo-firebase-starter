import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name='Party Near You' component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
