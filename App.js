import React from 'react'
import AppContainer from './navigation'
import Firebase, { FirebaseProvider } from './config/Firebase'

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  )
}
