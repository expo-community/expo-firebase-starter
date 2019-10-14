# expo-firebase 🔥

Is a quicker way to start with Expo + Firebase projects. It includes:

- navigation using `react-navigation` 4.x.x
- Firebase as backend for email auth
- uses Firestore to store user data
- handles different field types in forms
- handles server errors using Formik
- Login/Signup form built using Formik & yup
- uses `react-native-elements` for UI elements
- show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
- based on Expo SDK `35.x.x`

## Installation

- Clone this repo
- to install dependencies: `npm install` or `yarn install`
- rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
- and make sure to add your own Firebase config in this file:

```js
// Rename this file to "firebaeConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
}
```

## Screens

Main screens:

- Login
- Signup

![Successfull Signup](https://i.imgur.com/r40CEuW.gif)

![Error message](https://i.imgur.com/XXK3D7N.gif)

![Server Errors](https://i.imgur.com/DrqOjct.gif)

![Successful Login](https://i.imgur.com/toxtKit.gif)

## ⚠️⚠️⚠️

Expo uses Firebase Web SDK and does not support all Firebase services such as phone auth. If you are looking forward to use those services, please use `react-native-firebase` in a vanilla react native app.

[**Here is more on what and why Expo cannot support complete Firebase integration**](https://expo.canny.io/feature-requests/p/full-native-firebase-integration)

---

😃 If any of the code used in this you found useful to your project:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A611K61)

**Happy Coding!** 🎉🎉
