import React from 'react'
import {
  AsyncStorage,
} from 'react-native'
import { ACCESS_TOKEN } from '../config'

class Logout extends React.Component {
  componentDidMount() {
    this.loadInitialState().done()
  }

  loadInitialState = async () => {
    const { navigation } = this.props
    await AsyncStorage.removeItem(ACCESS_TOKEN)
    navigation.navigate('Login')
  }

  render() {
    return null
  }
}

export default Logout
