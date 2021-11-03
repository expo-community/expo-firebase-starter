import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { auth } from '../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IOSButton from '../components/IOSButton';
import { useTheme } from '@react-navigation/native';
import { useAtParty } from '../hooks';
import { attendParty, leaveParty } from '../config/firebase';

export const PartyModeScreen = ({navigation}) => {
  const {colors} = useTheme()
  const insets = useSafeAreaInsets()
  const atParty = useAtParty()
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
        <Button onPress={() => atParty ? leaveParty(atParty.id) : {}} title="End Party Mode" />
      ),
    });
  }, [navigation, atParty]);
  return (
    
    <View style={styles.container}>
      {atParty && 
        <View style={styles.infoView}>
            <Text style={{fontSize: 17, color: colors.warning}}>{atParty.police || 0}</Text>
            <Text style={{fontSize: 17, color: colors.success}}>{atParty.good || 0}</Text>
            <Text style={{fontSize: 17, color: colors.error}}>{atParty.bad || 0}</Text>
            <Text style={{fontSize: 17, color: "#fff"}}>{Object.keys(atParty).filter(field => field.substring(0, 5) == "user_" && atParty[field]).length || 0}</Text>
        </View>}
          <View style={{margin: 32}}>
            <IOSButton style="filled" ap="warning" title="Report Police"/>
            <IOSButton style="filled" ap="success" title="Good" top />
            <IOSButton style="filled" ap="error" title="Bad" top />
            <IOSButton style="filled" ap="info" title="Emergency Contact" top />
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
