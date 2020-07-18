import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  container: {
    flex: 1
  }
});
