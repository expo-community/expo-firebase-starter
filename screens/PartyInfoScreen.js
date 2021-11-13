import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { useparty } from '../hooks';
import { attendParty, getUsers, leaveParty, reportInfo } from '../config/firebase';
import * as Linking from 'expo-linking';
import { useUserData } from '../hooks/useUserData';
import Friend from '../components/Friend';
import { Icon } from '../components';

export const PartyInfoScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const {party} = route.params
  const [loaded, userData, filled] = useUserData()
  const [partyFriends, setPartyFriends] = useState([])

  useEffect(() => {
    if (userData && userData.friends) {
      var friendIDs = Object.keys(party).filter(field => field.substring(0, 5) == "user_" && party[field]).map((field) => field.substring(5))
      friendIDs = friendIDs.filter((id) => userData.friends.indexOf(id) != -1)
      getUsers(friendIDs).then((snaps) => {
        const docs = []
        snaps.forEach((snap) => docs.push({...snap.data(), id: snap.id}))
        setPartyFriends(docs)
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
        <Button onPress={() => navigation.goBack()} title="Cancel" />
      ),
    });
  }, [navigation]);
  const openDirections = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${party.loc.latitude},${party.loc.longitude}`;
    const label = 'Party';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

        
    Linking.openURL(url);
  }
  return (
    
    <View style={styles.container}>
      <ScrollView>
      {party && 
        <View style={styles.infoView}>
            {/*<Text style={{fontSize: 17, color: colors.warning}}>{party.police ? party.police.length : 0}</Text>*/}
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <Icon name="thumb-up" size={20} color={userData && party.good && party.good.indexOf(userData.id) == -1 ? colors.text : colors.success}/>
              <Text style={{marginLeft: 4, fontSize: 17, color: userData && party.good && party.good.indexOf(userData.id) == -1 ? colors.text : colors.success}}>{party.good ? party.good.length : 0}</Text></View>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <Icon name="thumb-down" size={20} color={userData && party.bad && party.bad.indexOf(userData.id) == -1 ? colors.text : colors.error}/>
              <Text style={{marginLeft: 4, fontSize: 17, color: userData && party.bad && party.bad.indexOf(userData.id) == -1 ? colors.text : colors.error}}>{party.bad ? party.bad.length : 0}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <Icon name="account" size={20} color={colors.text}/>
              <Text style={{marginLeft: 4, fontSize: 17, color: "#fff"}}>{Object.keys(party).filter(field => field.substring(0, 5) == "user_" && party[field]).length || 0}</Text>
            </View>
        </View>}
        <View style={{margin: 32}}>
          <IOSButton style="filled" ap="primary" title="Directions" onPress={() => openDirections()}/>
        </View>
        <View style={{marginHorizontal: 16}}>
          {partyFriends.length > 0 && <Text style={{fontSize: 26, color: "#fff", fontWeight: "800"}}>Friends At Party</Text>}
          {partyFriends.map(q => <Friend key={q.id} user={q} remove={() => removeFriend(q.id)} />)}
        </View>  
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
