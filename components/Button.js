import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

export const Button = ({ children, onPress, activeOpacity = 0.3, style }) => {
  const styles = useCallback(({ pressed }) => [
    style,
    { opacity: pressed ? activeOpacity : 1 }
  ]);

  return (
    <Pressable onPress={onPress} style={styles}>
      {children}
    </Pressable>
  );
};
