import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Colors } from '../config';

export const FriendRequest = (props) => {
    const { colors } = useTheme()
    const { user } = props
    console.log(JSON.stringify(colors))


    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            marginVertical: 8,
            justifyContent: "space-between",
            alignItems: "center"
        },
        left: {
            
        },
        right: {
            flexDirection: "row"
        },
        text: {
            color: colors.text
        }
    })

  return (
    <View style={styles.container}>
        <View style={styles.left}>
            <Text style={[styles.text, {fontSize: 20, fontWeight: "700"}]}>{user.username}</Text>
            <Text style={[styles.text, {fontSize: 17, marginTop: 8}]}>{user.name}</Text>
        </View>
        <View style={styles.right}>
            <Button title="Accept" onPress={() => props.accept()}/>
            <Button title="Decline" onPress={() => props.decline()}/>
        </View>
    </View>
  );
};

export default FriendRequest


