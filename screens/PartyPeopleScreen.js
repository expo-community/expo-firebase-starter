import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { useAtParty, useparty } from '../hooks';
import { attendParty, getUsers, leaveParty, removeFriend, reportInfo, requestFriend, searchUsername, updateUserData, usernameExists, usernameLookUp } from '../config/firebase';
import * as Linking from 'expo-linking';
import { TextInput } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserData } from '../hooks/useUserData';
import { PersonRequest } from '../components/Person';
import Friend from '../components/Friend';

export const PartyPeopleScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [username, setUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const [loaded, userData, filled] = useUserData()
  const [done, setDone] = useState(false)
  const [query, setQuery] = useState([])
  const isAtParty = useAtParty()


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
        await updateUserData(userData, {username: username, name: name})
        try {
            navigation.goBack()
        } catch(err) {
            console.log(err)
        }
    }
    setLoading(false)
    setDone(false)
    
  }

  useEffect(() => {
    if (isAtParty) {
      queryUsers()
    }
    
  }, [isAtParty, userData])

  const queryUsers = async () => {
    const userIds = Object.keys(isAtParty).filter(field => field.substring(0, 5) == "user_" && isAtParty[field]).map((field) => field.substring(5))
    const snaps = await getUsers(userIds)
    const docs = []
    snaps.forEach((snap) => docs.push({...snap.data(), id: snap.id}))
    console.log(docs.length)
    setQuery(docs)
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
        <Button onPress={() => navigation.goBack()} title={loading?<ActivityIndicator /> : "Done"} />
      ),
      title: "People At Party"
    });
  }, [navigation]);
  const doAddFriend = (user) => {
    requestFriend(user.id).then(() => Alert.alert("Friend Request Sent", `${user.username} requested`))
  }
  return (
    
    <View style={styles.container}>
        <ScrollView style={{marginHorizontal: 16}}>
            {query.sort((a, b) => b.score-a.score).map(q => userData.friends && userData.friends.indexOf(q.id) !== -1 ? <Friend key={q.id} user={q} remove={() => removeFriend(q.id)} border /> : <PersonRequest key={q.id} user={q} onRequest={() => doAddFriend(q)} />)}
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
