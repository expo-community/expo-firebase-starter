import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '../config';

export const FormErrorMessage = ({ error, visible }) => {
  const {colors} = useTheme()
  if (!error || !visible) {
    return null;
  }

  return <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    fontSize: 16,
    marginVertical: 8,
    fontWeight: '600'
  }
});
