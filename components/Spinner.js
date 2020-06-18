import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import SafeView from './SafeView';
import Colors from '../utils/colors';

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
