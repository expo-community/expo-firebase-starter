import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';

export const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [centered, setCentered] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('Permission to access location was denied');
        return;
      }

      let unsubscribeLocationChange = await Location.watchPositionAsync({}, (loc) => {
        if (centered) {
          setRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
        }
        setLocation(loc);
      });
      return unsubscribeLocationChange
    })();
  }, []);

  const reCenter = () => {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    })
    setCentered(true)
  }

  const regionChange = (region) => {
    if (centered) setCentered(false)
    setRegion(region)
  }

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLogout} title="Profile" />
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
        region={region}
        onRegionChange={regionChange}
      >
        {location&&<Marker
        coordinate={location.coords}
        title={"Party!!"}
        />}
      </MapView>}
      <View style={{position: "absolute", bottom: insets.bottom, width: "100%"}}>
          <View style={{margin: 32}}>
            <IOSButton style="filled" ap="primary" title="At Party" />
          </View>
      </View>
      {!centered && 
      <View style={{position: "absolute"}}>
          <View style={{margin: 32}}>
            <IOSButton style="shadow" ap="primary" title="Center" onPress={() => reCenter()} />
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
