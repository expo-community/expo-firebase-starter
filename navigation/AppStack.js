import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, PartyModeScreen } from '../screens';
import { PartyInfoScreen } from '../screens/PartyInfoScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { AddFriendScreen } from '../screens/AddFriendScreen';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name='Party Near You' component={HomeScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerLargeTitle: true, presentation: "modal" }}>
      <Stack.Screen name='Party Info' component={PartyInfoScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const OnboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export const PartyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="Party Mode" component={PartyModeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
