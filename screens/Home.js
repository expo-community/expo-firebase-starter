import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function Home({ navigation, firebase }) {
  async function handleSignout() {
    try {
      await firebase.signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withFirebaseHOC(Home);
