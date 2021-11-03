import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, PartyModeScreen } from '../screens';

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

export const PartyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="Party Mode" component={PartyModeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
