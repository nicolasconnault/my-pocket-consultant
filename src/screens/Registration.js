import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import { ACCESS_TOKEN, API_URL } from '../config'
import { fetchUser } from '../actions/authActions'

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      postcode: '',
      password: '',
      errors: [],
    }
    this.onRegistrationButtonPress = this.onRegistrationButtonPress.bind(this)
  }

  componentDidMount() {
    this.loadingInitialState().done()
  }

  async onRegistrationButtonPress() {
    const {
      firstName, lastName, postcode, username, password, errors,
    } = this.state
    const {
      navigation, dispatch,
    } = this.props

    try {
      const response = await fetch(`${API_URL}register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          postcode,
          username,
          password,
        }),
      })

      const res = await response.json()
      // Possible problems: Email already taken
      // If successful, automatically log in and get access token
      // TODO Email verification step (or SMS code)
      if (response.status >= 200 && response.status < 300) {
        this.setState({ error: '' })
        const accessToken = res.access_token
        this.storeToken(accessToken)

        if (!accessToken) {
          navigation.navigate('Login')
        } else {
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

  loadingInitialState = async () => {
    const { dispatch } = this.props
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if (token !== null) {
      dispatch(fetchUser(token))
    }
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
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <StatusBar translucent={false} barStyle="light-content" />
          <View>
            <TextInput
              onChangeText={val => this.setState({ firstName: val })}
              placeholder="First Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="Anne-Marie"
            />
            <TextInput
              onChangeText={val => this.setState({ lastName: val })}
              placeholder="Last Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="Connault"
            />
            <TextInput
              onChangeText={val => this.setState({ username: val })}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder="Email Address"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="amlconnault@gmail.com"
            />
            <TextInput
              onChangeText={val => this.setState({ postcode: val })}
              placeholder="Postcode/Zip Code"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="6220"
            />

            <TextInput
              onChangeText={val => this.setState({ password: val })}
              returnKeyType="go"
              placeholder="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              secureTextEntry
              defaultValue="password"
            />
            <TouchableOpacity
              onPress={this.onRegistrationButtonPress}
            >
              <Text>
CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(Registration)
