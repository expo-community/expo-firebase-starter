import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Colors } from '../config';

export const Friend = (props) => {
    const { colors } = useTheme()
    const { user } = props
    console.log(JSON.stringify(colors))


    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            marginVertical: 8,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: props.border ? 1 : 0,
            borderColor: colors.primary,
            borderStyle: "solid",
            borderRadius: 10,
            padding: props.border ? 8 : 0
        },
        score: {
            flex: 1,
            color: colors.text,
            fontSize: 20,
            fontWeight:"bold"
        },
        left: {
            flex: 3
        },
        right: {
            flexDirection: "row",
        },
        text: {
            color: colors.text
        }
    })

  return (
    <View style={styles.container}>
        <Text style={styles.score}>{user.score || 0}</Text>
        <View style={styles.left}>
            <Text style={[styles.text, {fontSize: 20, fontWeight: "700"}]}>{user.username}</Text>
            <Text style={[styles.text, {fontSize: 17, marginTop: 8}]}>{user.name}</Text>
        </View>
        <View style={styles.right}>
            <Button title="Remove" onPress={() => props.remove()}/>
        </View>
    </View>
  );
};

export default Friend


