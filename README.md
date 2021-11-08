# expo-firebase-starter

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase (using JS SDK) projects. It includes:

- based on Expo SDK `43`
- navigation using `react-navigation` 6.x.x
- Firebase JS SDK v9
- Firebase as backend for email auth
- custom and reusable components
- custom hook to toggle password field visibility on a TextInput
- handles server errors using Formik
- Login, Signup & Password Reset form built using Formik & yup
- show/hide Password Field's visibility
- uses a custom Provider using Context API & Firebase's `onAuthStateChanged` handler to checks user's auth state with
- handles Forgot Password Reset using Firebase email method
- uses [Expo Vector Icons](https://icons.expo.fyi/)
- uses [KeyboardAwareScrollView](https://github.com/APSL/react-native-keyboard-aware-scroll-view) package to handle keyboard appearance and automatically scrolls to focused TextInput
- uses `dotenv` and `expo-constants` packages to manage environment variables (so that they are not exposed on public repositories)
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

1. Create a new project using the firebase starter template.

```bash
$ npx create-react-native-app --template https://github.com/expo-community/expo-firebase-starter
```

2. Rename the file `example.env` to `.env`
3. Update `.env` with your own configuration, e.g.:

```shell
# Rename this file to ".env" before use
# Replace XXXX's with your own Firebase config keys
API_KEY=XXXX
AUTH_DOMAIN=XXXX
PROJECT_ID=XXXX
STORAGE_BUCKET=XXXX
MESSAGING_SENDER_ID=XXXX
APP_ID=XXXX
```

4. Start the project:

- `yarn ios` -- open on iOS
- `yarn android` -- open on Android

## File Structure

```shell
Expo Firebase Starter
├── assets ➡️ All static assets, includes app logo
├── components ➡️ All re-suable UI components for form screens
│   └── Button.js ➡️ Custom Button component using Pressable, comes with two variants and handles opacity
│   └── TextInput.js ➡️ Custom TextInput component that supports left and right cons
│   └── Icon.js ➡️ Icon component
│   └── FormErrorMessage.js ➡️ Component to display server errors from Firebase
│   └── LoadingIndicator.js ➡️ Loading indicator component
│   └── Logo.js ➡️ Logo component
│   └── View.js ➡️ Custom View component that supports safe area views
├── hooks ➡️ All custom hook components
│   └── useTogglePasswordVisibility.js ➡️ A custom hook that toggles password visibility on a TextInput component on a confirm password field
├── config ➡️ All configuration files
│   └── firebase.js ➡️ Configuration file to initialize firebase with firebaseConfig and auth
│   └── images.js ➡️ Require image assets, reusable values across the app
│   └── theme.js ➡️ Default set of colors, reusable values across the app
├── providers ➡️ All custom providers that use React Context API
│   └── AuthenticatedUserProvider.js ➡️ An Auth User Context component that shares Firebase user object when logged-in
├── navigation
│   └── AppStack.js ➡️ Protected routes such as Home screen
│   └── AuthStack.js ➡️ Routes such as Login screen, when the user is not authenticated
│   └── RootNavigator.js ➡️ Switch between Auth screens and App screens based on Firebase user logged-in state
├── screens
│   └── ForgotPassword.js ➡️ Forgot Password screen component
│   └── HomeScreen.js ➡️ Protected route/screen component
│   └── LoginScreen.js ➡️ Login screen component
│   └── SignupScreen.js ➡️ Signup screen component
├── App.js ➡️ Entry Point for Mobile apps, wrap all providers here
├── app.config.js ➡️ Expo config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```

## Screens

Main screens:

- Login
- Signup
- Forgot password
- Home (Bare Minimum) with a logout button

![Login screen with validation](https://i.imgur.com/cydaOYN.png)

![Successful Signup](https://i.imgur.com/62kcirI.png)

![Forgot Password](https://i.imgur.com/9J9a4Nl.png)

![Validation on Signup screens](https://i.imgur.com/DG0wTjG.png)

## CAUTION Please Note

Expo uses Firebase Web SDK and does not support all Firebase services such as phone auth. If you are looking forward to use those services, please use `react-native-firebase` in a Expo bare project, or an [Expo custom dev client](https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8) or a plain React Native project.

[**Here is more on what and why Expo cannot support complete Firebase integration**](https://expo.canny.io/feature-requests/p/full-native-firebase-integration)

---

<strong>Built with love by [@amanhimself](https://twitter.com/amanhimself)</strong>
