# expo-firebase-starter 🔥

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase projects. It includes:

- based on Expo SDK `42`
- navigation using `react-navigation` 5.x.x
- Firebase as backend for email auth
- custom and reusable form components
- handles different field types in forms
- handles server errors using Formik
- Login/Signup form built using Formik & yup
- show/hide Password Field's visibility 👁
- uses Context API & checks user's auth state
- implement Password Reset Screen
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

1. Create a new project using the firebase starter template.

```bash
$ npx create-react-native-app --template https://github.com/expo-community/expo-firebase-starter
```

2. Rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
3. Update `firebaseConfig.js` with your own configuration, e.g.:

```js
// Rename this file to "firebaseConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
};
```

4. Start the project:

- `yarn ios` -- open on iOS
- `yarn android` -- open on Android

## File Structure

```shell
Expo Firebase Starter
├── assets ➡️ All static assets
├── components ➡️ All re-suable UI components for form screens
│   └── Firebase ➡️ Firebase related config directory
│       └── firebaseConfig.js ➡️ Firebase API keys
│       └── firebase.js ➡️ Firebase app initialization & authentication helper methods
│   └── Forms ➡️ Reusable form components
│       └── Form.js ➡️ Reusable Form wrapper to apply Formik
│       └── FormButton.js ➡️ Reusable button component that handles form submit using Formik context hook
│       └── FormErrorMessage.js ➡️ Reusable component to display server errors from Firebase
│       └── FormField.js ➡️ Reusable TextInput component
│   └── AppButton.js ➡️ Button component
│   └── AppTextInput.js ➡️ TextInput component
│   └── IconButton.js ➡️ Button with icon only component
│   └── SafeView.js ➡️ SafeAreaView wrapper component
│   └── Spinner.js ➡️ Loading indicator component
├── hooks ➡️ All custom hook components
│   └── useStatusBar.js ➡️ A custom hook based on @react-navigation library to animate the status bar style changes
├── navigation
│   └── AppStack.js ➡️ Protected routes such as Home screen
│   └── AuthStack.js ➡️ Routes such as Login screen, when the user is not authenticated
│   └── AuthUserProvider.js ➡️ An Auth User Context component that shares Firebase user object when logged-in
│   └── navigationTheme.js ➡️ A default theme for navigation components
│   └── Routes.js ➡️ Switch between Auth and App stacks based on Firebase user logged-in state
├── screens
│   └── ForgotPassword.js ➡️ Forgot Password screen component
│   └── HomeScreen.js ➡️ Protected route/screen component
│   └── LoginScreen.js ➡️ Login screen component
│   └── RegisterScreen.js ➡️ Register screen component
│   └── WelcomeScreen.js ➡️ Initial screen component
├── utils
│   └── colors.js ➡️ Default, reusable values across the app
├── App.js ➡️ Entry Point for Mobile apps
├── app.json ➡️ Expo config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## Screens

Main screens:

- Login
- Signup
- Forgot password

![Initial Welcome Screen](https://i.imgur.com/KJAzftx.gif)

![Successful Signup](https://i.imgur.com/Ih72jol.gif)

![Successful Login](https://i.imgur.com/Xp0tiI1.gif)

![Forgot Password](https://i.imgur.com/HDvQMfp.png)

## ⚠️⚠️⚠️

Expo uses Firebase Web SDK and does not support all Firebase services such as phone auth. If you are looking forward to use those services, please use `react-native-firebase` in a vanilla react native app.

[**Here is more on what and why Expo cannot support complete Firebase integration**](https://expo.canny.io/feature-requests/p/full-native-firebase-integration)

---

<strong>Built by [@amanhimself](https://twitter.com/amanhimself)</strong>

**Happy Coding!** 🎉🎉
