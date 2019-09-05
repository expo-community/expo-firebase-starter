import React from 'react'
import { Image } from 'react-native-elements'

const Logo = require('../assets/flame.png')

const AppLogo = () => (
  <Image source={Logo} style={{ width: 200, height: 200 }} />
)

export default AppLogo
