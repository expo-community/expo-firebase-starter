import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, onPress, buttonType, buttonColor }) => (
  <Button
    type={buttonType}
    onPress={onPress}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{ color: buttonColor }}
  />
)

export default FormButton
