import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default class Login extends React.Component {
  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button title='Go to Signup' onPress={this.goToSignup} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
