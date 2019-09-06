import React, { Component } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'

export default class Initial extends Component {
  state = {
    isAssetsLoadingComplete: false
  }

  componentDidMount = async () => {
    this.loadLocalAsync()

    // TODO: add auth check here with firebase
    this.props.navigation.navigate('Auth')
  }

  loadLocalAsync = async () => {
    return await Promise.all([
      Asset.loadAsync([
        require('../assets/flame.png'),
        require('../assets/icon.png')
      ])
    ])
  }

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  handleFinishLoading = () => {
    this.setState({ isAssetsLoadingComplete: true })
  }

  render() {
    return (
      <AppLoading
        startAsync={this.loadLocalAsync}
        onFinish={this.handleFinishLoading}
        onError={this.handleLoadingError}
      />
    )
  }
}
