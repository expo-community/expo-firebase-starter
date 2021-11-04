
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { View } from './View';

export const LoadingIndicator = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFill, {backgroundColor: "rgb(28, 28, 30)"}]}>
      <ActivityIndicator size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
