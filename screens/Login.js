import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'

export default class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleEmailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  onLogin = async () => {
    const { email, password } = this.state
    try {
      if (email.length > 0 && password.length > 0) {
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      alert(error)
    }
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { email, password } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <FormInput
          name='email'
          value={email}
          placeholder='Enter email'
          autoCapitalize='none'
          onChangeText={this.handleEmailChange}
          iconName='ios-mail'
          iconColor='#2C384A'
        />
        <FormInput
          name='password'
          value={password}
          placeholder='Enter password'
          secureTextEntry
          onChangeText={this.handlePasswordChange}
          iconName='ios-lock'
          iconColor='#2C384A'
        />
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType='outline'
            onPress={this.handleOnLogin}
            title='LOGIN'
            buttonColor='#039BE5'
          />
        </View>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})
