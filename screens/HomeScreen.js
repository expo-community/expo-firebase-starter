import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, RefreshControlBase, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { createTestDoc, listenParties, distance, attendParty } from '../config/firebase';
import { FirebaseError } from '@firebase/util';

export const HomeScreen = ({navigation}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(false);
  const [displayRegion, setDisplayRegion] = useState(null)
  const [centered, setCentered] = useState(true)
  const [parties, setParties] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [partyLoading, setPartyLoading] = useState(false)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('Permission to access location was denied');
        return;
      }

      let unsubscribeLocationChange = await Location.watchPositionAsync({}, (loc) => {
        if (centered || location == null) {
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          })
          
        }
        if (location == null) setCentered(true)
        setLocation(loc);
      });
      return unsubscribeLocationChange
    })();
  }, []);

  useEffect(() => {
    if (location) {
      console.log("getting parties")
      
        refresh()
    }
  }, [location])

  const refresh = () => {
    setRefreshing(true)
    listenParties(location.coords, 10000).then((partyPromises) => {
      var docs = []
      partyPromises.forEach((bound) => bound.forEach(party => docs.push({...party.data(), id: party.id})))
      docs = docs.map(doc => ({...doc, distance: distance(doc.loc, location.coords), radius: partySize(doc), color: partyColor(doc)})).sort((a, b) => a.distance - b.distance)

      console.log(JSON.stringify(docs[0]))
      setRefreshing(false)
      setParties(docs)
    })
  }

  const reCenter = () => {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    })
    setDisplayRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    })
    setCentered(true)
  }

  const regionChange = (region) => {
    if (centered && location) {
      setDisplayRegion(null)
      setCentered(false)
    }
    setRegion(region)
  }

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  const atParty = () => {
    setPartyLoading(true)
    attendParty(parties, location.coords).then(() => setPartyLoading(false))
  }
  const partySize = (party) => {
    var attendance = Object.keys(party).filter(field => field.substring(0, 5) == "user_" && party[field]).length
    attendance = (5*attendance)
    if (attendance > 0) attendance+=100
    //const attendance = 30
    return attendance
  }
  const partyColor = (party) => {
    var color = "infoTransparent"
    const people = Object.keys(party).filter(field => field.substring(0, 5) == "user_" && party[field]).length
    const good = party.good ? party.good.length : 0
    const bad = party.bad ? party.bad.length : 0
    const police = party.police ? party.police.length : 0
    if (good > bad) color = "successTransparent"
    if (bad >= good && bad > 0) color = "errorTransparent"
    if (police > 0.01*people) color = "warningTransparent"
    return color
  }
  const onMapPress = (event) => {
    const coordinates = event.nativeEvent.coordinate;
    var ps = parties.map((party) => ({...party, touchDist: distance(coordinates, party.loc)*1000} )).filter(party => party.touchDist <= party.radius).sort((a, b) => a.touchDist - b.touchDist)
    if (ps.length > 0) {
      console.log("tapped on party")
      navigation.navigate("Party Info", {party: ps[0]})
    }

  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Profile")} title="Profile" />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {region&&
      <MapView
        userInterfaceStyle={'dark'}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        region={displayRegion}
        onRegionChange={regionChange}
        onPress={onMapPress}
      >
        
        {/*parties.map((party) => <Marker key={party.id} coordinate={{latitude: party.loc.latitude, longitude: party.loc.longitude}}><View style={{width: partySize(party), height: partySize(party), backgroundColor: colors.infoTransparent, borderRadius: partySize(party)/2, borderWidth: 2, borderStyle: "solid", borderColor: "#fff"}} />
          </Marker>)*/}
          {parties.map((party) => <Circle fillColor={colors[party.color]} strokeColor="#fff" key={party.id} center={{latitude: party.loc.latitude, longitude: party.loc.longitude}} radius={party.radius}></Circle>)}

          {location&&<Marker
        coordinate={location.coords}
        title={"You Are Here"}
        >
          <View style={{width: 15, height: 15, backgroundColor: colors.primary, borderRadius: 10, borderWidth: 2, borderStyle: "solid", borderColor: "rgba(255, 255, 255, 0.8)"}} />
          </Marker>}
      </MapView>}
        
      
      {location && <View style={{position: "absolute", bottom: insets.bottom, width: "100%"}}>
          <View style={{margin: 32}}>
            <IOSButton onPress={() => partyLoading ? {} : atParty()} style="filled" ap="primary" title={partyLoading ? <ActivityIndicator /> : "At Party"} />
          </View>
      </View>}
      {!centered && location && 
      <View style={{position: "absolute"}}>
          <View style={{margin: 32}}>
            <IOSButton style="shadow" ap="primary" title="Center" onPress={() => reCenter()} />
          </View>
      </View>}
      {location && <View style={{position: "absolute", right: 0}}>
          <View style={{margin: 32}}>
            <IOSButton style="shadow" ap="primary" title={refreshing ? <ActivityIndicator /> : "Refresh"} onPress={() => refreshing ? {} : refresh()} />
          </View>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  btmContainer: {
    position: "absolute",
  }
});
