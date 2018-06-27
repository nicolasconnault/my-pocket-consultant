import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'

import { OAUTH_URL, ACCESS_TOKEN, ASSETS_URL } from '../config'
import { fetchUser } from '../actions/authActions'

const logoImage = require('./white_logo.png')

const styles = {
  imageBackgroundStyle: {
    flex: 1,
    width: '100%',
    height: '100%',

    flexDirection: 'column',
  },
  logoStyle: {
    height: '90%',
    flex: 1,
  },
  logoContainerStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 100,
    alignSelf: 'flex-start',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
}
// TODO Use onLayout orientation detection to resize the main logo correctly
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
    this.onLayout = this.onLayout.bind(this)
  }

  componentDidMount() {
    this.loadInitialState().done()
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    console.log(width, height)
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
    const { error, username } = this.state
    const {
      imageBackgroundStyle,
      logoStyle,
      logoContainerStyle,
    } = styles

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
        source={{ uri: `${ASSETS_URL}Background.jpg` }}
        style={imageBackgroundStyle}
      >
        <StatusBar hidden />
        <KeyboardAvoidingView behavior="padding">

          <View
            style={logoContainerStyle}
            onLayout={this.onLayout}
          >
            <Image source={logoImage} style={logoStyle} />
          </View>

          <View>
            { errorMessage }
            <TextInput
              onChangeText={val => this.setState({ username: val })}
              keyboardType="email-address"
              placeholder="Email or Mobile Num"
              defaultValue={username}
            />

            <TextInput
              onChangeText={val => this.setState({ password: val })}
              placeholder="Password"
              secureTextEntry
            />

            <TouchableOpacity
              onPress={this.onLoginButtonPress}
            >
              <Text>
  LOGIN
              </Text>
            </TouchableOpacity>
            <Text>
              OR
            </Text>
            <TouchableOpacity
              onPress={this.onRegisterButtonPress}
            >
              <Text>
  REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

export default connect()(Login)
