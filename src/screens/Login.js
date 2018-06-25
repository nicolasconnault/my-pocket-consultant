import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from '../components/Forms/styles'

import { Logo } from '../components/Logo'
import { OAUTH_URL, ACCESS_TOKEN } from '../config'
import { fetchUser } from '../actions/authActions'

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MyConsultants' }),
  ],
})

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
    }

    this.onLoginButtonPress = this.onLoginButtonPress.bind(this)
    this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this)
  }

  componentDidMount() {
    this.loadInitialState().done()
  }

  onRegisterButtonPress = () => {
    const { navigation } = this.props
    const { username } = this.state
    navigation.navigate('Registration', { username })
  }

  async onLoginButtonPress() {
    const { username, password, error } = this.state
    const { navigation, dispatch } = this.props

    try {
      const response = await fetch(`${OAUTH_URL}token`, {
        method: 'POST',
        headers: {
          optcode: 'login',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          grant_type: 'password',
        }),
      })
      const res = await response.json()

      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: '' })
        const accessToken = res.access_token
        this.storeToken(accessToken)

        if (!accessToken) {
          navigation.navigate('Login')
        } else {
          navigation.dispatch(resetAction)
          dispatch(fetchUser(accessToken))
        }
      } else {
        let myError = { error: 'Login Error' }
        if (res.error === 'invalid_grant') {
          myError = { error: 'Invalid credentials' }
        }
        throw myError
      }
    } catch (exception) {
      const formError = exception
      this.setState({ error: formError.error })
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

  loadInitialState = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    const { dispatch } = this.props
    if (token !== null) {
      dispatch(fetchUser(token))
    }
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
      this.getToken()
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  render() {
    const { error, username } = this.state
    let errorMessage = null

    if (error.length > 0) {
      errorMessage = (
        <Text style={{ height: 40 }}>
          { error }
        </Text>
      )
    }

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Logo />
        <View>
          { errorMessage }
          <TextInput
            style={styles.input}
            onChangeText={val => this.setState({ username: val })}
            keyboardType="email-address"
            placeholder="Email or Mobile Num"
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            defaultValue={username}
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
            onPress={this.onLoginButtonPress}
          >
            <Text style={styles.buttonText}>
LOGIN
            </Text>
          </TouchableOpacity>
          <Text>
            OR
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onRegisterButtonPress}
          >
            <Text style={styles.buttonText}>
REGISTER
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(Login)
