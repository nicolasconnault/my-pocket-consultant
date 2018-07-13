import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'

import Container from '../../../components/Container'
import { ACCESS_TOKEN, API_URL } from '../../../config'
import { fetchUser } from '../../../actions/authActions'

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  }

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
    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = {}
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

  focusNextField(id) {
    this.inputs[id].focus()
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
    const { navigation } = this.props

    return (
      <Container>
        <KeyboardAvoidingView enabled>
          <StatusBar hidden />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigation.navigate('Login')}
            centerElement="Sign Up"
          />
          <View style={{ padding: 10 }}>
            <TextField
              onChangeText={val => this.setState({ firstName: val })}
              label="First Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="Anne-Marie"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('two')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['one'] = input
              }}
            />
            <TextField
              onChangeText={val => this.setState({ lastName: val })}
              label="Last Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="Connault"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('three')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['two'] = input
              }}
            />
            <TextField
              onChangeText={val => this.setState({ username: val })}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              label="Email Address"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="amlconnault@gmail.com"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('four')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['three'] = input
              }}
            />
            <TextField
              onChangeText={val => this.setState({ postcode: val })}
              label="Postcode/Zip Code"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              defaultValue="6220"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('five')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['four'] = input
              }}
            />

            <TextField
              onChangeText={val => this.setState({ password: val })}
              label="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              secureTextEntry
              defaultValue="password"
              blurOnSubmit
              returnKeyType="done"
              ref={(input) => {
                this.inputs['five'] = input
              }}
            />
            <Button
              primary
              raised
              onPress={this.onRegistrationButtonPress}
              text="CONTINUE"
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default connect()(Profile)
