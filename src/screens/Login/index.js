import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { connect } from 'react-redux'
import { Button } from 'react-native-material-ui'

import { OAUTH_URL, ACCESS_TOKEN } from '../../config'
import { fetchUser } from '../../actions/authActions'
import { landscapeStyles, portraitStyles } from './styles'

const logoImage = require('./white_logo.png')
const landscapeBackground = require('./LandscapeBackground.jpg')
const portraitBackground = require('./PortraitBackground.jpg')

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      orientation: null,
    }

    this.onLoginButtonPress = this.onLoginButtonPress.bind(this)
    this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this)
    this.onLayout = this.onLayout.bind(this)
  }

  componentDidMount() {
    this.loadInitialState().done()
  }

  onLayout() {
    const { width, height } = Dimensions.get('window')
    if (width > height) {
      this.setState({ orientation: 'landscape' })
    } else {
      this.setState({ orientation: 'portrait' })
    }
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

        if (!accessToken) {
          navigation.navigate('Login')
        } else {
          await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
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

  // If we already have a token in storage, it means the user hasn't logged out
  loadInitialState = async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    const { dispatch } = this.props
    if (token !== null) {
      dispatch(fetchUser(token))
    }
  }

  render() {
    const { error, username, orientation } = this.state
    const { navigation } = this.props
    const {
      imageBackgroundStyle,
      logoStyle,
      logoContainerStyle,
      mainContainerStyle,
      passwordReminderContainerStyle,
      passwordReminderStyle,
      buttonStyle,
      signUpButtonStyle,
      buttonContainerStyle,
    } = (orientation === 'landscape') ? landscapeStyles : portraitStyles

    let errorMessage = null

    if (error.length > 0) {
      errorMessage = (
        <Text style={{ height: 40 }}>
          { error }
        </Text>
      )
    }

    return (
      <ImageBackground
        source={(orientation === 'landscape') ? landscapeBackground : portraitBackground}
        style={imageBackgroundStyle}
      >
        <StatusBar hidden />
        <KeyboardAvoidingView behavior="padding">
          <View style={mainContainerStyle}>
            <View style={logoContainerStyle} onLayout={this.onLayout}>
              <Image source={logoImage} style={logoStyle} />
            </View>

            <View>
              { errorMessage }
              <TextField
                onChangeText={val => this.setState({ username: val })}
                label="Email"
                keyboardType="email-address"
                baseColor="#FFFFFF"
                textColor="#FFFFFF"
                tintColor="#FFFFFF"
                defaultValue={username}
              />

              <TextField
                onChangeText={val => this.setState({ password: val })}
                label="Password"
                labelHeight={16}
                baseColor="#FFFFFF"
                textColor="#FFFFFF"
                tintColor="#FFFFFF"
                secureTextEntry
              />
              <TouchableOpacity style={passwordReminderContainerStyle} onPress={() => { navigation.navigate('PasswordReminder') }}>
                <Text style={passwordReminderStyle}>
                  forgot your password?
                </Text>
              </TouchableOpacity>
              <View style={buttonContainerStyle}>
                <Button
                  style={buttonStyle}
                  onPress={this.onLoginButtonPress}
                  text="SIGN IN"
                  primary
                  raised
                />
                <Button
                  style={{ ...buttonStyle, signUpButtonStyle }}
                  onPress={this.onRegisterButtonPress}
                  text="NEW SIGN UP"
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

export default connect()(Login)
