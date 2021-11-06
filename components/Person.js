import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Colors } from '../config';

export const Person = (props) => {
    const { colors } = useTheme()
    const { user } = props
    console.log(JSON.stringify(colors))


    const styles = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            marginHorizontal: 16,
            marginVertical: 8
        },
        left: {
            
        },
        text: {
            color: colors.text
        }
    })

  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Text style={[styles.text]}>{user.username}</Text>
            <Text style={[styles.text]}>{user.name}</Text>
        </View>
    </View>
  );
};

export default Person


