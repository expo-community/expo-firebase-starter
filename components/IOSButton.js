import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Colors } from '../config';

export const IOSButton = (props) => {
    const theme = useTheme()

    const styles = StyleSheet.create({
      text_filled: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#fff",
        margin: 12,
      },
      filled: {
        backgroundColor: theme.colors[props.ap],
        borderRadius: 10,
        height: 44,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      },
      text_shadow: {
        fontSize: 17,
        color: theme.colors[props.ap],
        margin: 12,
      },
      shadow: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        height: 44,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      },
      text_ghost: {
        fontSize: 17,
        color: theme.colors[props.ap],
        margin: 12,
      },
      ghost: {
        borderRadius: 10,
        height: 44,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      }
    });

  return (
    <TouchableWithoutFeedback style={[styles[props.style], {marginTop: props.top ? 16 : 0, flex: 1, zIndex: 10}]} onPress={props.onPress}>
      <Text style={styles[`text_${props.style}`]}>{props.title}</Text>
    </TouchableWithoutFeedback>
  );
};

export default IOSButton


