import React from 'react'
import {
  AsyncStorage,
} from 'react-native'
import { ACCESS_TOKEN } from '../config'
import MyIcon from '../components/MyIcon'

class Logout extends React.Component {
  static navigationOptions = {
    drawerIcon: <MyIcon iconKey="logOut" />,
  }

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
