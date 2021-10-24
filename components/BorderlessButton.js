import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '../config';
import { Button } from './Button';

export const BorderlessButton = ({ title }) => {
  return (
    <Button style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  text: {
    fontSize: 16,
    color: Colors.blue
  }
});
