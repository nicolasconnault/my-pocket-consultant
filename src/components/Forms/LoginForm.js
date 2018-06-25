import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import styles from './styles'

const ACCESS_TOKEN = 'access_token'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: [],
    }
  }

  async onLoginButtonPress() {
    const {
      username, password, navigation, error
    } = this.state

    try {
      const response = await fetch('http://evwwa.com/corporate_track/index.php', {
        method: 'POST',
        headers: {
          optcode: 'login',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const res = await response.json()
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: '' })
        const accessToken = res.accesstoken
        this.storeToken(accessToken)
        console.log(`Response success is: ${accessToken}`)
        navigation.navigate('Main')
      } else {
        const myErrors = res
        throw myErrors
      }
    } catch (myErrors) {
      console.log(`catch error: ${myErrors}`)
      const formErrors = JSON.parse(myErrors)
      const errorArray = []
      formErrors.forEach((errors, key) => {
        if (errors.length > 1) {
          errors.map(formError => errorArray.push(`${key} ${formError}`))
        } else {
          errorArray.push(`${key} ${formErrors[key]}`)
        }
      })
      this.setState({ error: errorArray })
    }
  }

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
      console.log(`token is:${token}`)
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  _loadInitialState = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if (token !== null) {
      const { navigation } = this.props
      navigation.navigate('Main')
    }
  }

  ComponentDidMount = () => {
    this.loadInitialState().done()
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
      this.getToken()
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.setState({ username: val })}
          keyboardType="email-address"
          placeholder="Email or Mobile Num"
          placeholderTextColor="rgba(225,225,225,0.7)"
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.input}
          onChangeText={val => this.setState({ password: val })}
          placeholder="Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
          underlineColorAndroid="transparent"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onLoginButtonPress.bind(this)}
        >
          <Text style={styles.buttonText}>
LOGIN
          </Text>
        </TouchableOpacity>
      </View>

    )
  }
}

export default LoginForm
