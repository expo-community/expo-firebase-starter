import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const View = ({ isSafe, style, children }) => {
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <RNView style={{ paddingTop: insets.top, ...style }}>{children}</RNView>
    );
  }

  return <RNView style={StyleSheet.flatten(style)}>{children}</RNView>;
};
