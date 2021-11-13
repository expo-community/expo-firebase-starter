import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Button, RefreshControlBase, ActivityIndicator, Text, AsyncStorage, Animated } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { createTestDoc, listenParties, distance, attendParty, leaveParty, reportInfo, userDataListener, unreportInfo } from '../config/firebase';
import { FirebaseError } from '@firebase/util';
import { useAtParty } from '../hooks';
import { Icon } from '../components';
import { useUserData } from '../hooks/useUserData';
import * as Linking from "expo-linking"
import { TouchableOpacity } from 'react-native-gesture-handler';
import ConfettiCannon from 'react-native-confetti-cannon';

export const HomeScreen = ({navigation}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  var displayRegion = null
  const [centered, setCentered] = useState(true)
  const [parties, setParties] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [partyLoading, setPartyLoading] = useState(false)
  const isAtParty = useAtParty()
  const [number, setNumber] = useState("")
  const [loaded, userData, filled] = useUserData()
  const [panelOpen, setPanelOpen] = useState(true)
  const panelAnim = useRef(new Animated.Value(0)).current;
  const mapRef = useRef()
  const confetti = useRef()
  const [shoot, setShoot] = useState(false)
  const [animatedRegionChange, setAnimatedRegionChange] = useState(false)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('Permission to access location was denied');
        return;
      }

      let unsubscribeLocationChange = await Location.watchPositionAsync({}, (loc) => {
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: region ? region.latitudeDelta||0.025:0.025,
          longitudeDelta: region ? region.longitudeDelta||0.025:0.025,
        })
        if (centered || location == null) {
          console.log("changing display region")
          
          /*if (displayRegion == null) displayRegion = new MapView.AnimatedRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          })*
          /*displayRegion.timing({...{
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }, duration: 2000 })
          .start();*/
        }
        if (location == null) setAnimatedRegionChange(true)
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
      //console.log(JSON.stringify(docs[0]))
      setRefreshing(false)
      setParties(docs)
    })
  }

  const reCenter = () => {
    
    /*displayRegion.timing({...{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    }, duration: 2000 })
    .start();*/
    setCentered(true)
  }

  useEffect(() => {
    if (location && centered && isAtParty) {
      setAnimatedRegionChange(true)
      setRegion({
        latitude: location.coords.latitude-0.025/10,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      })
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude-0.025/10,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }, 500)
      
    } /*else if (location && centered && isAtParty && !panelOpen) {
      console.log("close panel map animation")
      setAnimatedRegionChange(true)
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      })
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }, 500)
    } */else if (location && centered && !isAtParty) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      })
      setAnimatedRegionChange(true)
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }, 500)
    }
    
  }, [centered, isAtParty, location])

  const sameCoords = (r) => {
    if (!location) return true
    const tol = 0.000001
    return (Math.abs(r.latitude-location.coords.latitude) < tol || Math.abs(r.latitude-(location.coords.latitude-0.025/10))<tol) && Math.abs(r.longitude-location.coords.longitude)<tol
  }

  const regionChange = (r) => {
    console.log(`loc: ${location} !sameCoords: ${!sameCoords(r)} !animated: ${!animatedRegionChange} && !refresh: ${!refreshing}`)
    setRegion(r)
    if (centered && location && !sameCoords(r) && !animatedRegionChange && !refreshing) {
      
      //setDisplayRegion(null)
      setCentered(false)
    }
    if (animatedRegionChange || sameCoords(r)) {
      setAnimatedRegionChange(false)
      setCentered(true)
    }
  }

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  const atParty = () => {
    setPartyLoading(true)
    setShoot(true)
    attendParty(parties, location.coords).then(() => {
      setPartyLoading(false)
    }).catch(() => setPartyLoading(false))
  }
  useEffect(() => {
    AsyncStorage.getItem("em#").then((num) => {if (num) {
        console.log(num)
        setNumber(num)}})
  }, [navigation])
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
  useEffect(() => {
    if (panelOpen) {
      showPartyPanel()
    } else hidePartyPanel()
  }, [panelOpen])
  const hidePartyPanel = () => {
    Animated.timing(panelAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }
  const showPartyPanel = () => {
    Animated.timing(panelAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Profile")} title="Profile" />
      ),
      headerLeft: () => (
        <Button onPress={() => navigation.navigate("Friends")} title="Friends" />
      ),
      title: isAtParty ? "Party Mode" : "Party Near You"
    });
  }, [navigation, isAtParty]);
  const changeInfo = (field) => {
    if (userData && isAtParty[field] && isAtParty[field].indexOf(userData.id) == -1) {
      reportInfo(isAtParty.id, field)
    } else {
      unreportInfo(isAtParty.id, field)
    }
  }
  return (
    <>
    
    <View style={styles.container}>
      {region &&
      <MapView
        ref={mapRef}
        userInterfaceStyle={'dark'}
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        onRegionChangeComplete={regionChange}
        onPress={onMapPress}
      >
        
        {/*parties.map((party) => <Marker key={party.id} coordinate={{latitude: party.loc.latitude, longitude: party.loc.longitude}}><View style={{width: partySize(party), height: partySize(party), backgroundColor: colors.infoTransparent, borderRadius: partySize(party)/2, borderWidth: 2, borderStyle: "solid", borderColor: "#fff"}} />
          </Marker>)*/}
          {parties.filter(doc => Object.keys(doc).filter(field => field.substring(0, 5) == "user_" && doc[field]).map((field) => field.substring(5)).some(r=> [...userData.friends, userData.id].indexOf(r) >= 0)).map((party) => <Circle fillColor={colors[party.color]} strokeColor="#fff" key={party.id} center={{latitude: party.loc.latitude, longitude: party.loc.longitude}} radius={party.radius}></Circle>)}

          {location&&<Marker
        coordinate={location.coords}
        title={"You Are Here"}
        >
          <View style={{width: 15, height: 15, backgroundColor: colors.primary, borderRadius: 10, borderWidth: 2, borderStyle: "solid", borderColor: "rgba(255, 255, 255, 0.8)"}} />
          </Marker>}
      </MapView>}
        
      {isAtParty && 
      <View style={{position: "absolute", bottom: insets.bottom, width: "100%"}}>
        
        <View style={styles.infoView}>
          {/*<Text style={{fontSize: 17, color: colors.warning}}>{atParty.police ? atParty.police.length : 0}</Text>*/}
          <View style={{flexDirection: 'row', alignItems: "center"}}>
          <TouchableOpacity onPress={() => changeInfo("good")} style={{flexDirection: 'row', alignItems: "center", paddingHorizontal: 20, paddingVertical: 8}}>
            <Icon name="thumb-up" size={20} color={userData && isAtParty.good && isAtParty.good.indexOf(userData.id) == -1 ? colors.text : colors.success}/>
            <Text style={{marginLeft: 4, fontSize: 17, color: userData && isAtParty.good && isAtParty.good.indexOf(userData.id) == -1 ? colors.text : colors.success}}>{isAtParty.good ? isAtParty.good.length : 0}</Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <TouchableOpacity onPress={() => changeInfo("bad")} style={{flexDirection: 'row', alignItems: "center", paddingHorizontal: 20, paddingVertical: 8}}>
              <Icon name="thumb-down" size={20} color={userData && isAtParty.bad && isAtParty.bad.indexOf(userData.id) == -1 ? colors.text : colors.error}/>
              <Text style={{marginLeft: 4, fontSize: 17, color: userData && isAtParty.bad && isAtParty.bad.indexOf(userData.id) == -1 ? colors.text : colors.error}}>{isAtParty.bad ? isAtParty.bad.length : 0}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Party Info", {party: isAtParty})} style={{flexDirection: 'row', alignItems: "center", paddingHorizontal: 20, paddingVertical: 8}}>
              <Icon name="account" size={20} color={colors.text}/>
              <Text style={{marginLeft: 4, fontSize: 17, color: "#fff"}}>{Object.keys(isAtParty).filter(field => field.substring(0, 5) == "user_" && isAtParty[field]).length || 0}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin: 32, marginTop: 0}}>
          {/*<IOSButton style="filled" ap="warning" title="Report Police" onPress={() => reportInfo(isAtParty.id, "police")}/>*/}
          <IOSButton style="filled" ap="info" title="Emergency Contact" onPress={() => Linking.openURL("tel:"+number)} top />
          <IOSButton onPress={() => partyLoading ? {} : leaveParty(isAtParty.id)} style="filled" ap="primary" title={partyLoading ? <ActivityIndicator /> : "Exit Party Mode"} top />
        </View>
      </View>}
      {location && !isAtParty && <View style={{position: "absolute", bottom: insets.bottom, width: "100%"}}>
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
      {shoot &&
      <ConfettiCannon
        count={200}
        origin={{x: 200, y: 0}}
        onAnimationEnd={() => setShoot(false)}
        ref={confetti}
        explosionSpeed={350}
        fallSpeed={2500}
        fadeOut
        style={{zIndex: 10}}
      />}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  btmContainer: {
    position: "absolute",
  },
  btmContainer: {
    position: "absolute",
  },
  infoView: {
      flexDirection: "row",
      marginHorizontal: 32,
      paddingLeft: 16,
      paddingRight: 16,
      paddingVertical: 8,
      borderRadius: 10,
      justifyContent: "space-around",
      backgroundColor: "rgba(28, 28, 30, 0.8)"
  }
});
