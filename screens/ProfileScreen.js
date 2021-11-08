import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { useparty } from '../hooks';
import { attendParty, leaveParty, reportInfo, updateUserData, usernameExists, usernameLookUp } from '../config/firebase';
import * as Linking from 'expo-linking';
import { TextInput } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserData } from '../hooks/useUserData';

export const ProfileScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [number, setNumber] = useState("")
  const [username, setUserName] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [loaded, userData, filled] = useUserData()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (userData) {
        if (userData.username) setUserName(userData.username)
        if (userData.name) setName(userData.name)
    }
  }, [userData])

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

  useEffect(() => {
    if (done) {
        doneAction()
    }
  }, [done])

  const doneAction = async () => {
    setLoading(true)
    const unExists = await usernameExists(username)
    if (unExists) {
        Alert.alert("Username Exists", "Please choose a different username")
    } else {
        await updateUserData(userData && Object.keys(userData).filter(key => key != "id").length > 0, {username: username, name: name})
        try {
            navigation.goBack()
        } catch(err) {
            console.log(err)
        }
    }
    setLoading(false)
    setDone(false)
    
  }
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
        <Button onPress={() => setDone(true)} title={loading?<ActivityIndicator /> : "Done"} />
      ),
      headerLeft: () => (
        <Button onPress={() => signOut(auth).catch(error => console.log('Error logging out: ', error))} title="Logout" />
      ),
    });
  }, [navigation]);
  return (
    
    <View style={styles.container}>
        <ScrollView style={{marginHorizontal: 16}}>
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
            <TextInput
                    name='username'
                    leftIconName='account-search'
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={username}
                    onChangeText={(text) => setUserName(text)}
                    />
            <TextInput
                    name='name'
                    leftIconName='account'
                    placeholder='Name'
                    autoCorrect={false}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    />
        
        </ScrollView>
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
