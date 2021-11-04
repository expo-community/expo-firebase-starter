import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
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

export const PartyInfoScreen = ({navigation, route}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const {party} = route.params
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
      {party && 
        <View style={styles.infoView}>
            {/*<Text style={{fontSize: 17, color: colors.warning}}>{party.police ? party.police.length : 0}</Text>*/}
            <Text style={{fontSize: 17, color: colors.success}}>{party.good ? party.good.length : 0}</Text>
            <Text style={{fontSize: 17, color: colors.error}}>{party.bad ? party.bad.length : 0}</Text>
            <Text style={{fontSize: 17, color: "#fff"}}>{Object.keys(party).filter(field => field.substring(0, 5) == "user_" && party[field]).length || 0}</Text>
        </View>}
          <View style={{margin: 32}}>
            <IOSButton style="filled" ap="primary" title="Directions" onPress={() => openDirections()}/>
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
