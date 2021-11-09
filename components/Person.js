import { useTheme } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet, View, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { auth, Colors } from '../config';
import PartyIcon from './PartyIcon';

export const PersonRequest = (props) => {
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
        score: {
            flex: 1,
            color: colors.text,
            fontSize: 20,
            fontWeight:"bold"
        },
        left: {
            flex: 2
        },
        right: {
        },
        text: {
            color: colors.text
        }
    })

  return (
    <View style={styles.container}>
        <Text style={styles.score}><View style={{width: 20, height: 20}}><PartyIcon /></View> {user.score || 0}</Text>
        <View style={styles.left}>
            <Text style={[styles.text, {fontSize: 20, fontWeight: "700"}]}>{user.username}</Text>
            <Text style={[styles.text, {fontSize: 17, marginTop: 8}]}>{user.name}</Text>
        </View>
        {auth.currentUser.uid !== user.id && <View style={styles.right}>
            <Button title="Request" onPress={() => props.onRequest()}/>
        </View>}
    </View>
  );
};

export default PersonRequest


