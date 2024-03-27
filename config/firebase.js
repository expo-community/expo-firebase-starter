import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import Constants from "expo-constants";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// add firebase config
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
};

// initialize firebase
const app = initializeApp(firebaseConfig);

//
// Need to upgrade to Expo with typescrip inorder getReactNativePersistence to work.
//

//initialize auth
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

const auth = initializeAuth(app);

export { auth };
