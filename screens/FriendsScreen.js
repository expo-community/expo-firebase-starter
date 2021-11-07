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
import { acceptRequest, attendParty, declineRequest, getUsers, leaveParty, removeFriend, reportInfo, updateUserData, usernameExists, usernameLookUp } from '../config/firebase';
import * as Linking from 'expo-linking';
import { TextInput } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserData } from '../hooks/useUserData';
import Person from '../components/Person';
import FriendRequest from '../components/FriendRequest';
import Friend from '../components/Friend';

export const FriendsScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, userData, filled] = useUserData()
  const [done, setDone] = useState(false)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (userData) {
      getUsers(userData.incomingRequests).then((snaps) => {
        const docs = []
        snaps.forEach((snap) => docs.push({...snap.data(), id: snap.id}))
        console.log(docs.length)
        setRequests(docs)
      })
      getUsers(userData.friends).then((snaps) => {
        const docs = []
        snaps.forEach((snap) => docs.push({...snap.data(), id: snap.id}))
        console.log(docs.length)
        setFriends(docs)
      })
    }
  }, [userData])
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
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("AddFriend")} title="Add Friend" />
      ),
    });
  }, [navigation]);
  return (
    
    <View style={styles.container}>
        <ScrollView style={{marginHorizontal: 16}}>
          {requests.length > 0 && <Text style={{fontSize: 26, color: "#fff", fontWeight: "800"}}>Friend Requests</Text>}
          {requests.map(q => <FriendRequest key={q.id} user={q} accept={() => acceptRequest(q.id)} decline={() => declineRequest(q.id)} />)}
          {friends.length > 0 && requests.length > 0 && <Text style={{fontSize: 26, color: "#fff", fontWeight: "800"}}>Friends</Text>}
          {friends.map(q => <Friend key={q.id} user={q} remove={() => removeFriend(q.id)} />)}
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
