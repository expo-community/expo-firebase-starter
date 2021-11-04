import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { useparty } from '../hooks';
import { attendParty, leaveParty, reportInfo } from '../config/firebase';
import * as Linking from 'expo-linking';
import { TextInput } from '../components';

export const ProfileScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [number, setNumber] = useState("")

  useEffect(() => {
      if (number && number.length > 0) {
        AsyncStorage.setItem("em#", number)
      }
      
  }, [number])

  useEffect(() => {
    AsyncStorage.getItem("em#").then((num) => {if (num) {
        console.log(num)
        setNumber(num)}})
  }, [navigation])
  // const [location, setLocation] = useState(null);

  /*useEffect(() => {
      
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('Permission to access location was denied');
        return;
      }

      let unsubscribeLocationChange = await Location.watchPositionAsync({}, (loc) => {
        // location change
        setLocation(loc);
      });
      return unsubscribeLocationChange
    })();
  }, []);*/
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.goBack()} title="Done" />
      ),
      headerLeft: () => (
        <Button onPress={() => signOut(auth).catch(error => console.log('Error logging out: ', error))} title="Logout" />
      ),
    });
  }, [navigation]);
  return (
    
    <View style={styles.container}>
        <View style={{marginHorizontal: 16}}>
        <TextInput
                  name='contact number'
                  leftIconName='hospital-box'
                  placeholder='Emergency Contact Number'
                  autoCapitalize='none'
                  autoCorrect={false}
                  textContentType='telephoneNumber'
                  value={number}
                  onChangeText={(text) => setNumber(text)}
                />
                </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  btmContainer: {
    position: "absolute",
  },
  infoView: {
      flexDirection: "row",
      marginLeft: 64,
      marginRight: 64,
      marginTop: 32,
      justifyContent: "space-around"
  }
});
