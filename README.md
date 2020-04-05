# expo-firebase-starter 🔥

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase projects. It includes:

- based on Expo SDK `37.x.x`
- navigation using `react-navigation` 4.x.x
- Firebase as backend for email auth
- uses Firestore to store user data
- handles different field types in forms
- handles server errors using Formik
- Login/Signup form built using Formik & yup
- uses `react-native-elements` for UI elements
- show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
- implement Password Reset Screen
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

- Clone this repo
- to install dependencies: `npm install` or `yarn install`
- rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
- and make sure to add your own Firebase config in this file as shown below.

```js
// Rename this file to "firebaeConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  apiKey: "XXXX",
  authDomain: "XXXX",
  databaseURL: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};
```

## File Strucutre

```shell
Expo Firebase Starter
├── assets ➡️ All static assets
├── components ➡️ All re-suable UI components for form screens
├── config
│   └── firebase ➡️ Firebase related config
│       └── context.js ➡️ Firebase high order component consumed in screen components
│       └── firebaseConfig.js ➡️ Firebase API keys
│       └── firebase.js ➡️ Firebase authentication helper methods
├── navigation
│   └── AppNavigation.js ➡️ Protected routes such as Home screen
│   └── AuthNavigation.js ➡️ Routes such as Login screen, when the user is not authenticated
│   └── index.js ➡️ Switch between different stack navigators including "Initial" screen
├── screens
│   └── ForgotPassword.js ➡️ Forgot Password screen component
│   └── Home.js ➡️ Protected route/screen component
│   └── Initial.js ➡️ Load initial assets component, and checks if the user is already logged in
│   └── Login.js ➡️ Login screen component
│   └── Signup.js ➡️ Register screen component
├── App.js ➡️ Entry Point for Mobile apps
├── app.json ➡️ Expo config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## Screens

Main screens:

- Login
- Signup
- Forgot password

![Successfull Signup](https://i.imgur.com/r40CEuW.gif)

![Error message](https://i.imgur.com/XXK3D7N.gif)

![Server Errors](https://i.imgur.com/DrqOjct.gif)

![Successful Login](https://i.imgur.com/toxtKit.gif)

![Forgot Password](https://i.imgur.com/fZ91yar.png)

## ⚠️⚠️⚠️

Expo uses Firebase Web SDK and does not support all Firebase services such as phone auth. If you are looking forward to use those services, please use `react-native-firebase` in a vanilla react native app.

[**Here is more on what and why Expo cannot support complete Firebase integration**](https://expo.canny.io/feature-requests/p/full-native-firebase-integration)

---

<strong>Built by [@amanhimself](https://twitter.com/amanhimself)</strong>

**Happy Coding!** 🎉🎉
